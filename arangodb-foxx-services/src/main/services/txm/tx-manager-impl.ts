/*
 * Copyright 2023 ABSA Group Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {TxManager} from './tx-manager'
import {
    AuxCollectionName,
    CollectionName,
    Counter,
    DataCollectionName,
    ReadTxInfo,
    TxAwareDocument,
    TxId,
    TxNum,
    TxParams,
    WriteTxInfo
} from '../../persistence/model'
import {store} from '../store'
import {aql, db} from '@arangodb'
import * as Logger from '../../utils/logger'
import UpdateResult = ArangoDB.UpdateResult


/**
 * Max attempts to atomically increment the counter
 */
const MAX_GET_TX_NUM_ATTEMPTS = 50

export class TxManagerImpl implements TxManager {

    private nextTxNumber(): TxNum {
        let attempts = MAX_GET_TX_NUM_ATTEMPTS
        while (attempts-- > 0) {
            try {
                const curCnt: Counter = store.getDocByKey(CollectionName.Counter, 'tx')

                // as of time of writing the '@types/arangodb:3.5.13' was the latest version,
                // and it was not up-to-date with ArangoDB 3.10+ JavaScript API
                // @ts-ignore
                const updResult: UpdateResult<Counter> = db._update(
                    curCnt._id,
                    {
                        curVal: curCnt.curVal + 1
                    },
                    // @ts-ignore
                    {
                        overwrite: false, // check _rev
                        returnNew: true   // return an updated document in the `new` attribute
                    }
                )

                const newCnt: Counter = updResult.new

                return newCnt.curVal
            }
            catch (e) {
                const errNum = e.errorNum
                if (errNum !== 1200) {
                    throw new Error(`Failed to obtain a new Tx number.\nUnderlying error ${errNum}: ${e.message}`)
                }
            }
        }
        throw new Error(`Failed to obtain a new Tx number after ${MAX_GET_TX_NUM_ATTEMPTS} attempts.`)
    }

    startWrite(txParams: TxParams = {}): WriteTxInfo {
        // The following steps must be executed in the given exact order
        // (opposite to one for the READ transaction) as follows:

        // First,
        // register a new Tx ID in the transaction registry
        const txId: TxId = store.insertOne({}, AuxCollectionName.TxInfo)._key

        // Second,
        // obtain a next global number to fix a transaction position on a serializable time axis.
        const txNum: TxNum = this.nextTxNumber()

        // Return a new WRITE transaction info
        const wtxInfo: WriteTxInfo = {
            num: txNum,
            uid: txId,
            params: txParams,
        }
        Logger.debug('[TX] WRITE STARTED', wtxInfo)
        return wtxInfo
    }

    startRead(): ReadTxInfo {
        // The following steps must be executed in the given exact order
        // (opposite to one for the WRITE transaction) as follows:

        // First,
        // obtain a next global number to fix a transaction position on a serializable time axis.

        // const txIds: TxId[] =
        const txNum: TxNum = this.nextTxNumber()

        // Second,
        // fetch the list of uncommitted transaction IDs from the registry
        const txIds: TxId[] = db[CollectionName.TxInfo].all().toArray().map(tx => tx._key)

        // Return a new READ transaction info
        const rtxInfo: ReadTxInfo = {
            num: txNum,
            liveTxIds: txIds,
        }
        Logger.debug('[TX] READ STARTED', rtxInfo)
        return rtxInfo
    }

    commit(txInfo: WriteTxInfo): void {
        store.deleteByKey(AuxCollectionName.TxInfo, txInfo.uid)
        Logger.debug('[TX] COMMITTED', txInfo)
    }

    rollback(txInfo: WriteTxInfo): void {
        Logger.debug('[TX] ROLLBACK STARTING', txInfo)
        for (const colName in DataCollectionName) {
            db._query(aql`
                WITH ${colName}
                FOR d IN ${colName}
                    FILTER d._txInfo.uid == ${txInfo.uid}
                    REMOVE d._key IN ${colName}
                `
            )
        }
        store.deleteByKey(AuxCollectionName.TxInfo, txInfo.uid)
        Logger.debug('[TX] ROLLBACK COMPLETE', txInfo)
    }

    isVisibleFromTx(rtx: ReadTxInfo, ...docs: TxAwareDocument[]): boolean {
        const n = docs.length
        const rtxNum: TxNum = rtx.num
        const liveTxIds: TxId[] = rtx.liveTxIds

        // Not using Array.every() for performance reasons,
        // for-loop is several time faster.
        for (let i = 0; i < n; i++) {
            const wtx: WriteTxInfo | undefined = docs[i]?._txInfo
            if (wtx === undefined)
                continue
            if (wtx.num >= rtxNum || liveTxIds.includes(wtx.uid))
                return false
        }
        return true
    }
}
