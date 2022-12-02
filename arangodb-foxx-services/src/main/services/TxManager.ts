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

import {
    AuxCollectionName,
    CollectionName,
    Counter,
    DataCollectionName,
    ReadTxInfo,
    TxAwareDocument,
    TxId,
    TxNum,
    WriteTxInfo
} from '../persistence/model'
import { store } from './store'
import { db } from '@arangodb'
import events from 'events'
import * as Logger from '../utils/logger'


const eventsEmitter = new events.EventEmitter({ captureRejections: true })

function on(eventType: TxEvent, handler: (...args: unknown[]) => void) {
    // In PRE_COMMIT handlers, in case of a failure, we want to break
    // the transaction and retry it later. Handlers that do not aim to
    // break transaction should listen to POST_COMMIT events.
    const h = (eventType === TxEvent.PreCommit)
        ? handler
        : (...args) => {
            try {
                handler(...args)
            }
            catch (err) {
                Logger.error(err)
            }
        }
    eventsEmitter.on(eventType, h)
}

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
    eventsEmitter.emit(TxEvent.StartWrite, wtxInfo)
    Logger.debug('[TX] WRITE STARTED', wtxInfo)
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
    Logger.debug('[TX] READ STARTED', rtxInfo)
    return rtxInfo
}

/**
 * Commit given WRITE transaction
 * @param txInfo WRITE transaction metadata to rollback
 */
function commit(txInfo: WriteTxInfo): void {
    eventsEmitter.emit(TxEvent.PreCommit, txInfo)
    store.deleteByKey(AuxCollectionName.TxInfo, txInfo.uid)
    Logger.debug('[TX] COMMITTED', txInfo)
    eventsEmitter.emit(TxEvent.PostCommit, txInfo)
}

/**
 * Rollback given WRITE transaction
 * @param txInfo WRITE transaction metadata to rollback
 */
function rollback(txInfo: WriteTxInfo): void {
    Logger.debug('[TX] ROLLBACK STARTING', txInfo)
    eventsEmitter.emit(TxEvent.PreRollback, txInfo)

    for (const cn in DataCollectionName) {
        const col = db[DataCollectionName[cn]]
        col.removeByExample({ _txInfo: txInfo })
    }

    store.deleteByKey(AuxCollectionName.TxInfo, txInfo.uid)

    eventsEmitter.emit(TxEvent.PostRollback, txInfo)
    Logger.debug('[TX] ROLLBACK COMPLETE', txInfo)
}

/**
 * Checks if all the `docs` are visible from the `rtx` READ transaction.
 * The document is visible from the READ transaction if:
 *   = the document was created out of any logical transaction, OR
 *   - the doc's associated WRITE transaction has been committed
 *     before the current READ one started.
 * @param rtx Read transaction info object
 * @param docs ArangoDB document(s)
 * @return true - if all `docs` are visible, false - otherwise
 */
function isVisibleFromTx(rtx: ReadTxInfo, ...docs: TxAwareDocument[]): boolean {
    const n = docs.length
    const rtxNum: TxNum = rtx.num
    const liveTxIds: TxId[] = rtx.liveTxIds

    // Not using Array.every() for performance reasons,
    // for-loop is several time faster.
    for (let i = 0; i < n; i++) {
        const wtx: WriteTxInfo | undefined = docs[i]?._tx_info
        if (wtx === undefined)
            continue
        if (wtx.num >= rtxNum || liveTxIds.includes(wtx.uid))
            return false
    }
    return true
}

export enum TxEvent {
    StartWrite = 'TX_START_WRITE',
    PreCommit = 'TX_PRE_COMMIT',
    PostCommit = 'TX_POST_COMMIT',
    PreRollback = 'TX_PRE_ROLLBACK',
    PostRollback = 'TX_POST_ROLLBACK',
}

export const TxManager = {
    startWrite,
    startRead,
    commit,
    rollback,
    isVisibleFromTx,
    on
}
