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

declare module '@arangodb/aql/functions' {
    /**
     * Registers an AQL user function, identified by a fully qualified function name.
     * The function code in code must be specified as a JavaScript function or a string
     * representation of a JavaScript function.
     * If the function code in code is passed as a string, it is required that the string
     * evaluates to a JavaScript function definition.
     *
     * @param name fully qualified function name
     * @param code function code
     * @param isDeterministic whether the function results are fully deterministic
     * @return false - the function was newly created, true - an existing function was updated.
     */
    export function register(
        name: string,
        code: string | ((...args: any) => any),
        isDeterministic: boolean
    ): boolean

    /**
     * Unregisters an existing AQL user function, identified by the fully qualified function name.
     * Trying to unregister a function that does not exist will result in an exception.
     *
     * @param name fully qualified function name
     * @return true if the function was successfully unregistered
     */
    export function unregister(
        name: string
    ): boolean

    /**
     * Unregister a group of AQL user functions.
     *
     * @param group common function group prefix
     * @return the number of functions unregistered
     */
    export function unregisterGroup(
        group: string
    ): number
}
