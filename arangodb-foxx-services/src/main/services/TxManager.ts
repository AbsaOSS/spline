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

import { AuxCollectionName, CollectionName, Counter, ReadTxInfo, TxId, TxNum, WriteTxInfo } from '../persistence/model'
import { uuidv4 } from '@arangodb/crypto'
import { store } from './store'
import { db } from '@arangodb'


function newTxId(): TxId {
    // There is no requirement for good locality
    // (TxInfo is a single-shard collection),
    // sorting or range querying by ID, so a simple
    // UUIDv4 seems to be a good enough transaction ID for now.

    // todo: check quality of the implementation, whether a good quality random gen is used.
    return uuidv4()
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

    const txNum: TxNum = nextTxNumber()
    const txUid: TxId = newTxId()

    const wtxInfo: WriteTxInfo = {
        num: txNum,
        _key: txUid,
    }

    store.insertOne(wtxInfo, AuxCollectionName.TxInfo)

    console.log('[TX] START WRITE:', wtxInfo)
    return wtxInfo
}

/**
 * Start new logical transaction for READ
 * @return new READ transaction metadata
 */
function startRead(): ReadTxInfo {
    //TODO: implement it
    const txInfo: ReadTxInfo = {
        num: -1,
        uncommittedTxIds: [],
    }
    console.log('[TX] START READ:', txInfo)
    return txInfo
}

/**
 * Commit given WRITE transaction
 * @param txInfo WRITE transaction metadata to rollback
 */
function commit(txInfo: WriteTxInfo): void {
    store.deleteByKey(AuxCollectionName.TxInfo, txInfo._key)
    console.log('[TX] COMMIT:', txInfo)
}

/**
 * Rollback given WRITE transaction
 * @param txInfo WRITE transaction metadata to rollback
 */
function rollback(txInfo: WriteTxInfo): void {
    //TODO: implement it
    console.log('[TX] ROLLBACK:', txInfo)
}

export const TxManager = {
    startWrite,
    startRead,
    commit,
    rollback,
}
