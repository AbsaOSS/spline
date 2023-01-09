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

import { TxManager } from './tx-manager'
import events from 'events'
import { ReadTxInfo, TxAwareDocument, TxEvent, TxParams, WriteTxInfo } from '../../persistence/model'
import * as Logger from '../../utils/logger'


export class SubscribableTxManagerDecorator implements TxManager {

    private readonly eventsEmitter = new events.EventEmitter({ captureRejections: true })

    constructor(private readonly internalTxManager: TxManager) {
    }

    on(eventType: TxEvent, handler: (...args: unknown[]) => void) {
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
        this.eventsEmitter.on(eventType, h)
    }

    commit(txInfo: WriteTxInfo): void {
        this.eventsEmitter.emit(TxEvent.PreCommit, txInfo)
        this.internalTxManager.commit(txInfo)
        this.eventsEmitter.emit(TxEvent.PostCommit, txInfo)
    }

    isVisibleFromTx(rtx: ReadTxInfo, ...docs: TxAwareDocument[]): boolean {
        return this.internalTxManager.isVisibleFromTx(rtx, ...docs)
    }

    rollback(txInfo: WriteTxInfo): void {
        this.eventsEmitter.emit(TxEvent.PreRollback, txInfo)
        this.internalTxManager.rollback(txInfo)
        this.eventsEmitter.emit(TxEvent.PostRollback, txInfo)
    }

    startRead(): ReadTxInfo {
        return this.internalTxManager.startRead()
    }

    startWrite(txParams: TxParams): WriteTxInfo {
        const wtxInfo = this.internalTxManager.startWrite(txParams)
        this.eventsEmitter.emit(TxEvent.StartWrite, wtxInfo)
        return wtxInfo
    }
}
