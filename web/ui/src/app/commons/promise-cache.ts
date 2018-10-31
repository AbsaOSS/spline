/*
 * Copyright 2017 ABSA Group Limited
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

export class PromiseCache<V> {
    private cache: { [key: string]: Promise<V>; } = {}

    public put(key: string, value: Promise<V>): this {
        this.cache[key] = value
        return this
    }

    public get(key: string): Promise<V> | undefined {
        return this.cache[key]
    }

    public getOrCreate(key: string, create: (key: string) => Promise<V>): Promise<V> {
        let value: Promise<V> = this.cache[key]
        if (!value) {
            value = create(key).catch((err) => {
                delete this.cache[key]
                throw err
            }) as Promise<V>
            this.cache[key] = value
        }
        return value
    }
}