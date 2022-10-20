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

/*
======================================================================================================
THIS IS A PLACEHOLDER FILE - DO NOT REMOVE!
It prevents the "error ts18003: no inputs were found in config file" error of the TypeScript compiler.

The file is also an example of a custom AQL function that can be called from AQL like this:
LET z = SPLINE::EXAMPLE(x, y)

Note:
    The name of the AQL function is defined by the name of the file, not by the name of the function
    inside the file!
======================================================================================================
*/

// Define your custom function. It must be pure function with no side effects.
function myCoolFunction(x: number, y: number): number {
    // call some logic
    const myCoolClass = new MyCoolClass(x, y)
    // return a result
    return myCoolClass.doStuff()
}

// You can also define other private functions and classes if needed.
class MyCoolClass {
    constructor(
        private x: number,
        private y: number) {
    }

    doStuff(): number {
        return this.x + this.y
    }
}

export = myCoolFunction
