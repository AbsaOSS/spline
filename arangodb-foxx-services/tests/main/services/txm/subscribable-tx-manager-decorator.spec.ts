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

import { ReadTxInfo, TxAwareDocument, TxEvent, TxId, TxParams, WriteTxInfo } from '../../../../src/main/persistence/model'
import { SubscribableTxManagerDecorator } from '../../../../src/main/services/txm/subcribable-tx-manager-decorator'


const mockTxManagerImpl = {
    startRead: jest.fn(),
    startWrite: jest.fn(),
    commit: jest.fn(),
    rollback: jest.fn(),
    isVisibleFromTx: jest.fn(),
}

const startWriteHandler = jest.fn()
const preCommitHandler = jest.fn()
const postCommitHandler = jest.fn()
const preRollbackHandler = jest.fn()
const postRollbackHandler = jest.fn()

// @ts-ignore
const txManagerDecorator = new SubscribableTxManagerDecorator(mockTxManagerImpl)

txManagerDecorator.on(TxEvent.StartWrite, startWriteHandler)
txManagerDecorator.on(TxEvent.PreCommit, preCommitHandler)
txManagerDecorator.on(TxEvent.PostCommit, postCommitHandler)
txManagerDecorator.on(TxEvent.PreRollback, preRollbackHandler)
txManagerDecorator.on(TxEvent.PostRollback, postRollbackHandler)

beforeEach(() => {
    jest.resetAllMocks()
})

test('startRead() should be delegated', () => {
    const dummyResult = {}
    mockTxManagerImpl.startRead.mockReturnValue(dummyResult)

    const res = txManagerDecorator.startRead()
    expect(res).toBe(dummyResult)

    expect(mockTxManagerImpl.startRead.mock.calls.length).toBe(1)
    expect(mockTxManagerImpl.startWrite.mock.calls.length).toBe(0)
    expect(mockTxManagerImpl.commit.mock.calls.length).toBe(0)
    expect(mockTxManagerImpl.rollback.mock.calls.length).toBe(0)
    expect(mockTxManagerImpl.isVisibleFromTx.mock.calls.length).toBe(0)
})

test('startWrite() should be delegated', () => {
    const dummySID: TxId = 'dummy_tx_sid'
    const dummyTxParams: TxParams = {}
    const dummyResult = {}
    mockTxManagerImpl.startWrite.mockReturnValue(dummyResult)

    const res = txManagerDecorator.startWrite(dummySID, dummyTxParams)
    expect(res).toBe(dummyResult)

    expect(mockTxManagerImpl.startRead.mock.calls.length).toBe(0)
    expect(mockTxManagerImpl.startWrite.mock.calls.length).toBe(1)
    expect(mockTxManagerImpl.commit.mock.calls.length).toBe(0)
    expect(mockTxManagerImpl.rollback.mock.calls.length).toBe(0)
    expect(mockTxManagerImpl.isVisibleFromTx.mock.calls.length).toBe(0)

    expect(mockTxManagerImpl.startWrite.mock.lastCall[0]).toBe(dummySID)
    expect(mockTxManagerImpl.startWrite.mock.lastCall[1]).toBe(dummyTxParams)
})

test('commit() should be delegated', () => {
    // @ts-ignore
    const dummyTxInfo: WriteTxInfo = {}

    txManagerDecorator.commit(dummyTxInfo)

    expect(mockTxManagerImpl.startRead.mock.calls.length).toBe(0)
    expect(mockTxManagerImpl.startWrite.mock.calls.length).toBe(0)
    expect(mockTxManagerImpl.commit.mock.calls.length).toBe(1)
    expect(mockTxManagerImpl.rollback.mock.calls.length).toBe(0)
    expect(mockTxManagerImpl.isVisibleFromTx.mock.calls.length).toBe(0)

    expect(mockTxManagerImpl.commit.mock.lastCall[0]).toBe(dummyTxInfo)
})

test('rollback() should be delegated', () => {
    // @ts-ignore
    const dummyTxInfo: WriteTxInfo = {}

    txManagerDecorator.rollback(dummyTxInfo)

    expect(mockTxManagerImpl.startRead.mock.calls.length).toBe(0)
    expect(mockTxManagerImpl.startWrite.mock.calls.length).toBe(0)
    expect(mockTxManagerImpl.commit.mock.calls.length).toBe(0)
    expect(mockTxManagerImpl.rollback.mock.calls.length).toBe(1)
    expect(mockTxManagerImpl.isVisibleFromTx.mock.calls.length).toBe(0)

    expect(mockTxManagerImpl.rollback.mock.lastCall[0]).toBe(dummyTxInfo)
})

test('isVisibleFromTx() should be delegated', () => {
    // @ts-ignore
    const dummyTxInfo: ReadTxInfo = {}
    const dummyDoc1: TxAwareDocument = {}
    const dummyDoc2: TxAwareDocument = {}
    const dummyResult = {}
    mockTxManagerImpl.isVisibleFromTx.mockReturnValue(dummyResult)

    const res = txManagerDecorator.isVisibleFromTx(dummyTxInfo, dummyDoc1, dummyDoc2)
    expect(res).toBe(dummyResult)

    expect(mockTxManagerImpl.startRead.mock.calls.length).toBe(0)
    expect(mockTxManagerImpl.startWrite.mock.calls.length).toBe(0)
    expect(mockTxManagerImpl.commit.mock.calls.length).toBe(0)
    expect(mockTxManagerImpl.rollback.mock.calls.length).toBe(0)
    expect(mockTxManagerImpl.isVisibleFromTx.mock.calls.length).toBe(1)

    expect(mockTxManagerImpl.isVisibleFromTx.mock.lastCall[0]).toBe(dummyTxInfo)
    expect(mockTxManagerImpl.isVisibleFromTx.mock.lastCall[1]).toBe(dummyDoc1)
    expect(mockTxManagerImpl.isVisibleFromTx.mock.lastCall[2]).toBe(dummyDoc2)
})

test('on(TX_START_WRITE)', () => {
    // @ts-ignore
    const dummyTxInfo: WriteTxInfo = {}
    mockTxManagerImpl.startWrite.mockReturnValue(dummyTxInfo)

    txManagerDecorator.startWrite(null, null)

    expect(startWriteHandler.mock.calls.length).toBe(1)
    expect(preCommitHandler.mock.calls.length).toBe(0)
    expect(postCommitHandler.mock.calls.length).toBe(0)
    expect(preRollbackHandler.mock.calls.length).toBe(0)
    expect(postRollbackHandler.mock.calls.length).toBe(0)

    expect(startWriteHandler.mock.lastCall[0]).toBe(dummyTxInfo)
})

test('on(TX_PRE_COMMIT | TX_POST_COMMIT)', () => {
    // @ts-ignore
    const dummyTxInfo: WriteTxInfo = {}

    txManagerDecorator.commit(dummyTxInfo)

    expect(startWriteHandler.mock.calls.length).toBe(0)
    expect(preCommitHandler.mock.calls.length).toBe(1)
    expect(postCommitHandler.mock.calls.length).toBe(1)
    expect(preRollbackHandler.mock.calls.length).toBe(0)
    expect(postRollbackHandler.mock.calls.length).toBe(0)

    expect(preCommitHandler.mock.lastCall[0]).toBe(dummyTxInfo)
    expect(postCommitHandler.mock.lastCall[0]).toBe(dummyTxInfo)

    expect(preCommitHandler).toHaveBeenCalledBefore(mockTxManagerImpl.commit)
    expect(postCommitHandler).toHaveBeenCalledAfter(mockTxManagerImpl.commit)
})

test('on(TX_PRE_ROLLBACK | TX_POST_ROLLBACK)', () => {
    // @ts-ignore
    const dummyTxInfo: WriteTxInfo = {}

    txManagerDecorator.rollback(dummyTxInfo)

    expect(startWriteHandler.mock.calls.length).toBe(0)
    expect(preCommitHandler.mock.calls.length).toBe(0)
    expect(postCommitHandler.mock.calls.length).toBe(0)
    expect(preRollbackHandler.mock.calls.length).toBe(1)
    expect(postRollbackHandler.mock.calls.length).toBe(1)

    expect(preRollbackHandler.mock.lastCall[0]).toBe(dummyTxInfo)
    expect(postRollbackHandler.mock.lastCall[0]).toBe(dummyTxInfo)

    expect(preRollbackHandler).toHaveBeenCalledBefore(mockTxManagerImpl.rollback)
    expect(postRollbackHandler).toHaveBeenCalledAfter(mockTxManagerImpl.rollback)
})
