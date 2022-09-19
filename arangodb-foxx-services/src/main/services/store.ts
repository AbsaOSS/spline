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

import { CollectionName } from '../persistence/model'
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

function insertOne<T extends {}>(doc: T, colName: CollectionName): ArangoDB.InsertResult {
    const col = dbCollections[colName]
    return col.insert(doc)
}

function insertMany<T extends {}>(docs: T[], colName: CollectionName): void {
    const col = dbCollections[colName]
    docs.forEach(doc => col.insert(doc, { silent: true }))
}

function getDocByKey(colName: CollectionName, key: DocumentKey): Document {
    return db._document(`${colName}/${key}`)
}

export const store = {
    getDocByKey,
    insertOne,
    insertMany,
}
