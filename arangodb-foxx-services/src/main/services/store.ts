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

import { CollectionName, WriteTxInfo } from '../persistence/model'
import { db } from '@arangodb'
import { DocumentKey } from '../model'
import Document = ArangoDB.Document


const dbCollections: Record<CollectionName, ArangoDB.Collection> =
    Object.keys(CollectionName).reduce(
        (p, c) => {
            const colName: CollectionName = CollectionName[c]
            return ({ ...p, [colName]: db._collection(colName) })
        },
        {} as Record<CollectionName, ArangoDB.Collection>
    )

function insertOne<T extends {}>(doc: T, colName: CollectionName, txInfo: WriteTxInfo = undefined): ArangoDB.InsertResult {
    const col = dbCollections[colName]
    const rec: any = txInfo ? { ...doc, _txInfo: txInfo } : doc
    return col.insert(rec)
}

function insertMany<T extends {}>(docs: T[], colName: CollectionName, txInfo: WriteTxInfo = undefined): void {
    const col = dbCollections[colName]
    docs.forEach(doc => {
        const rec = txInfo ? { ...doc, _txInfo: txInfo } : doc
        col.insert(rec, { silent: true })
    })
}

function getDocByKey<T extends Document>(colName: CollectionName, key: DocumentKey): T {
    return <T>db._document(`${colName}/${key}`)
}

function deleteByKey<T extends Document>(colName: CollectionName, key: DocumentKey): void {
    (<any>db)._remove({ _id: `${colName}/${key}` }, { silent: true })
}

export const store = {
    getDocByKey,
    insertOne,
    insertMany,
    deleteByKey,
}
