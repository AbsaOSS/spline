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


import { ReadTxInfo, TxAwareDocument, TxId, TxNum, WriteTxInfo } from '../main/persistence/model'


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
function isVisible(rtx: ReadTxInfo, ...docs: TxAwareDocument[]): boolean {
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

export = isVisible
