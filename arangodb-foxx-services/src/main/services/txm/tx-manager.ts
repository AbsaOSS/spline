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

import { ReadTxInfo, TxAwareDocument, TxId, TxParams, WriteTxInfo } from '../../persistence/model'


export interface TxManager {
    /**
     * Start new logical transaction for WRITE
     * @param sid secondary transaction ID - serves for deduplication purposes.
     *            It MUST be unique if and only if the data written by the transaction is logically unique.
     * @param txParams additional parameters associated and stored with this transaction info.
     * @return new WRITE transaction metadata
     */
    startWrite(sid: TxId, txParams: TxParams): WriteTxInfo

    /**
     * Start new logical transaction for READ
     * @return new READ transaction metadata
     */
    startRead(): ReadTxInfo

    /**
     * Commit given WRITE transaction
     * @param txInfo WRITE transaction metadata to rollback
     */
    commit(txInfo: WriteTxInfo): void

    /**
     * Rollback given WRITE transaction
     * @param txInfo WRITE transaction metadata to rollback
     */
    rollback(txInfo: WriteTxInfo): void

    /**
     * Checks if all the `docs` are visible from the `rtx` READ transaction.
     * The document is visible from the READ transaction if:
     *   - the document was created out of any logical transaction, OR
     *   - the doc's associated WRITE transaction has been committed
     *     before the current READ one started.
     * @param rtx Read transaction info object
     * @param docs ArangoDB document(s)
     * @return true - if all `docs` are visible, false - otherwise
     */
    isVisibleFromTx(rtx: ReadTxInfo, ...docs: TxAwareDocument[]): boolean

}
