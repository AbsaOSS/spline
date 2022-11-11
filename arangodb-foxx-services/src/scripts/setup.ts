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

import aqlFunctions from '@arangodb/aql/functions'
import * as fs from 'fs'
import { context } from '@arangodb/locals'


const workDir = context.basePath

// Register AQL functions

const aqlFuncFileSuffix = '.func.js'
const aqlFuncFileRegexp = RegExp(`(.*)${aqlFuncFileSuffix}`)

const aqlSrcDir = fs.join(workDir, 'aql')
const aqlFuncFiles = fs.list(aqlSrcDir).filter(fn => fn.endsWith(aqlFuncFileSuffix))

for (const aqlFuncFile of aqlFuncFiles) {
    const funcRawCode = fs.read(fs.join(aqlSrcDir, aqlFuncFile))
    const funcLocalName = aqlFuncFileRegexp.exec(aqlFuncFile)[1].toUpperCase()
    const funcFQN = `SPLINE::${funcLocalName}`
    const funcWrappedCode = `
       (function(){
         console.log('Create AQL Function ${funcFQN}')
         const module = {}
         ;${funcRawCode};
         return module.exports
       })()
    `
    aqlFunctions.register(funcFQN, funcWrappedCode, true)
}
