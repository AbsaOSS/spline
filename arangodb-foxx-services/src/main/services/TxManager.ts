/*
 * Copyright 2022 ABSA Group Limited
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

import { AuxCollectionName, CollectionName, Counter, DataCollectionName, ReadTxInfo, TxId, TxNum, WriteTxInfo } from '../persistence/model'
import { store } from './store'
import { db } from '@arangodb'


function nextTxNumber(): TxNum {
    const curCnt: Counter = store.getDocByKey(CollectionName.Counter, 'tx')

    // as of time of writing the '@types/arangodb:3.5.13' was the latest version,
    // and it was not up-to-date with ArangoDB 3.9 JavaScript API
    const newCnt: Counter = (<any>db)._update(
        curCnt,
        {
            curVal: curCnt.curVal + 1
        },
        {
            overwrite: false, // check _rev
            returnNew: true   // return an updated document in the `new` attribute
        }
    ).new

    return newCnt.curVal
}

/**
 * Start new logical transaction for WRITE
 * @return new WRITE transaction metadata
 */
function startWrite(): WriteTxInfo {
    // The following steps must be executed in the given exact order
    // (opposite to one for the READ transaction) as follows:

    // First,
    // register a new Tx ID in the transaction registry
    const txId: TxId = store.insertOne({}, AuxCollectionName.TxInfo)._key

    // Second,
    // obtain a next global number to fix a transaction position on a serializable time axis.
    const txNum: TxNum = nextTxNumber()

    // Return a new WRITE transaction info
    const wtxInfo: WriteTxInfo = {
        num: txNum,
        uid: txId,
    }
    console.log('[TX] START WRITE:', wtxInfo)
    return wtxInfo
}

/**
 * Start new logical transaction for READ
 * @return new READ transaction metadata
 */
function startRead(): ReadTxInfo {
    // The following steps must be executed in the given exact order
    // (opposite to one for the WRITE transaction) as follows:

    // First,
    // obtain a next global number to fix a transaction position on a serializable time axis.

    // const txIds: TxId[] =
    const txNum: TxNum = nextTxNumber()

    // Second,
    // fetch the list of uncommitted transaction IDs from the registry
    const txIds: TxId[] = db[CollectionName.TxInfo].all().toArray().map(tx => tx._key)

    // Return a new READ transaction info
    const rtxInfo: ReadTxInfo = {
        num: txNum,
        liveTxIds: txIds,
    }
    console.log('[TX] START READ:', rtxInfo)
    return rtxInfo
}

/**
 * Commit given WRITE transaction
 * @param txInfo WRITE transaction metadata to rollback
 */
function commit(txInfo: WriteTxInfo): void {
    store.deleteByKey(AuxCollectionName.TxInfo, txInfo.uid)
    console.log('[TX] COMMIT:', txInfo)
}

/**
 * Rollback given WRITE transaction
 * @param txInfo WRITE transaction metadata to rollback
 */
function rollback(txInfo: WriteTxInfo): void {
    console.log('[TX] ROLLBACK:', txInfo)

    for (const cn in DataCollectionName) {
        const col = db[DataCollectionName[cn]]
        col.removeByExample({ _txInfo: txInfo })
    }

    store.deleteByKey(AuxCollectionName.TxInfo, txInfo.uid)
}

export const TxManager = {
    startWrite,
    startRead,
    commit,
    rollback,
}
