/* global arango:true, ArangoClusterInfo */

'use strict';

// ////////////////////////////////////////////////////////////////////////////
// @brief JavaScript base module
//
// @file
//
// DISCLAIMER
//
// Copyright 2004-2013 triAGENS GmbH, Cologne, Germany
//
// Licensed under the Apache License, Version 2.0 (the "License")
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// Copyright holder is triAGENS GmbH, Cologne, Germany
//
// @author Dr. Frank Celler
// @author Copyright 2012-2013, triAGENS GmbH, Cologne, Germany
// @author Copyright 2020, ArangoDB GmbH, Cologne, Germany
// //////////////////////////////////////////////////////////////////////////////

// //////////////////////////////////////////////////////////////////////////////
// / aql
// //////////////////////////////////////////////////////////////////////////////

function isAqlQuery(query) {
    return Boolean(query && typeof query.query === "string" && query.bindVars);
}

function isGeneratedAqlQuery(query) {
    return isAqlQuery(query) && typeof query._source === "function";
}

function isAqlLiteral(literal) {
    return Boolean(literal && typeof literal.toAQL === "function");
}

exports.aql = function aql(templateStrings, ...args) {
    const strings = [...templateStrings];
    const bindVars = {};
    const bindVals = [];
    let query = strings[0];
    for (let i = 0; i < args.length; i++) {
        const rawValue = args[i];
        let value = rawValue;
        if (isGeneratedAqlQuery(rawValue)) {
            const src = rawValue._source();
            if (src.args.length) {
                query += src.strings[0];
                args.splice(i, 1, ...src.args);
                strings.splice(
                    i,
                    2,
                    strings[i] + src.strings[0],
                    ...src.strings.slice(1, src.args.length),
                    src.strings[src.args.length] + strings[i + 1]
                );
            } else {
                query += rawValue.query + strings[i + 1];
                args.splice(i, 1);
                strings.splice(i, 2, strings[i] + rawValue.query + strings[i + 1]);
            }
            i -= 1;
            continue;
        }
        if (rawValue === undefined) {
            query += strings[i + 1];
            continue;
        }
        if (isAqlLiteral(rawValue)) {
            query += `${rawValue.toAQL()}${strings[i + 1]}`;
            continue;
        }
        const index = bindVals.indexOf(rawValue);
        const isKnown = index !== -1;
        let name = `value${isKnown ? index : bindVals.length}`;
        if (rawValue && rawValue.isArangoCollection) {
            name = `@${name}`;
            value = rawValue.name();
        }
        if (!isKnown) {
            bindVals.push(rawValue);
            bindVars[name] = value;
        }
        query += `@${name}${strings[i + 1]}`;
    }
    return {
        query,
        bindVars,
        _source: () => ({ strings, args })
    };
};

exports.aql.literal = function (value) {
    if (isAqlLiteral(value)) {
        return value;
    }
    return {
        toAQL() {
            if (value === undefined) {
                return "";
            }
            return String(value);
        }
    };
};

exports.aql.join = function (values, sep = " ") {
    if (!values.length) {
        return exports.aql``;
    }
    if (values.length === 1) {
        return exports.aql`${values[0]}`;
    }
    return exports.aql(
        ["", ...Array(values.length - 1).fill(sep), ""],
        ...values
    );
};

