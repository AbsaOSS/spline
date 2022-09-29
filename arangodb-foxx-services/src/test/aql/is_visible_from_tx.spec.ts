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

import isVisible = require('../../aql/is_visible_from_tx.func')
import { ReadTxInfo, TxAwareDocument } from '../../main/persistence/model'


test('IS_VISIBLE_FROM_TX', () => {
    const rtx: ReadTxInfo = {
        num: 42,
        liveTxIds: ['111', '222', '333']
    }

    const doc0: TxAwareDocument = {
        // VISIBLE DOCUMENT
        // no _tx_info
    }

    const doc1: TxAwareDocument = {
        // VISIBLE DOCUMENT
        _tx_info: {
            num: 41,
            uid: '555'
        }
    }

    const doc2: TxAwareDocument = {
        // INVISIBLE DOCUMENT
        _tx_info: {
            num: 42, // == rtx.num (hypothetical case, not practically possible)
            uid: '555'
        }
    }

    const doc3: TxAwareDocument = {
        // INVISIBLE DOCUMENT
        _tx_info: {
            num: 43, // > rtx.num
            uid: '555'
        }
    }

    const doc4: TxAwareDocument = {
        // INVISIBLE DOCUMENT
        _tx_info: {
            num: 41,
            uid: '222' // is among rtx.liveTxIds
        }
    }

    // null safety
    expect(isVisible(rtx)).toBe(true)
    expect(isVisible(rtx, <any>null)).toBe(true)

    // visible docs
    expect(isVisible(rtx, doc0)).toBe(true)
    expect(isVisible(rtx, doc1)).toBe(true)

    // invisible docs
    expect(isVisible(rtx, doc2)).toBe(false)
    expect(isVisible(rtx, doc3)).toBe(false)
    expect(isVisible(rtx, doc4)).toBe(false)

    // multiple docs
    expect(isVisible(rtx, doc0, doc1)).toBe(true)
    expect(isVisible(rtx, doc1, doc2, doc3, doc4)).toBe(false)
})
