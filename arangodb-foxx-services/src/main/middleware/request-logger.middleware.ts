/*
 * Copyright 2024 ABSA Group Limited
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


export function RequestLogger(req: Foxx.Request, res: Foxx.Response, next: () => void) {
    const start = Date.now()
    let status = res.statusCode
    try {
        next()
        status ||= 200
    }
    catch (e) {
        status ||= 500
    }
    finally {
        const duration = Date.now() - start
        console.log(`[Foxx] ${req.method} ${req.url} -- ${status} ${duration} ms`)
    }
}
