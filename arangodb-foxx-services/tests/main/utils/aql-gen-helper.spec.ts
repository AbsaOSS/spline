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

import { AQLCodeGenHelper } from '../../../src/main/utils/aql-gen-helper'
import dedent from 'dedent'


const dummyRtxInfo = {
    num: 42,
    liveTxIds: ['111']
}

test('genTxIsolationCodeForTraversal', () => {
    const query = new AQLCodeGenHelper(dummyRtxInfo).genTxIsolationCodeForTraversal('foo', 'bar')

    expect(query.bindVars).toEqual({ 'value0': dummyRtxInfo })
    expect(dedent(query.query)).toEqual(dedent(`
        PRUNE __isAnyUncommitted_1 = LENGTH([foo, bar][*
            FILTER CURRENT._tx_info.num >= @value0.num
                OR POSITION(@value0.liveTxIds, CURRENT._tx_info.uid)
            LIMIT 1
            RETURN CURRENT._id
        ]) != 0
        FILTER !__isAnyUncommitted_1
    `))
})

test('genTxIsolationCodeForLoop', () => {
    const query = new AQLCodeGenHelper(dummyRtxInfo).genTxIsolationCodeForLoop('foo', 'bar')

    expect(query.bindVars).toEqual({ 'value0': dummyRtxInfo })
    expect(dedent(query.query)).toEqual(dedent(`
        LET __isAnyUncommitted_1 = LENGTH([foo, bar][*
            FILTER CURRENT._tx_info.num >= @value0.num
                OR POSITION(@value0.liveTxIds, CURRENT._tx_info.uid)
            LIMIT 1
            RETURN CURRENT._id
        ]) != 0
        FILTER !__isAnyUncommitted_1
    `))
})

test('genTxIsolationCodeForTraversal -- empty args', () => {
    const query = new AQLCodeGenHelper(dummyRtxInfo).genTxIsolationCodeForTraversal()

    expect(query.bindVars).toEqual({})
    expect(query.query).toBe('')
})

test('genTxIsolationCodeForLoop -- empty args', () => {
    const query = new AQLCodeGenHelper(dummyRtxInfo).genTxIsolationCodeForLoop()

    expect(query.bindVars).toEqual({})
    expect(query.query).toBe('')
})
