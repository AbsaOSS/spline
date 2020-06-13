/*
 * Copyright 2020 ABSA Group Limited
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

import { getText } from '../../util/expressions'
import { AttributeVM } from '../viewModels/attributeVM'


export namespace OperationProperty {

  export type NativeProperties = Record<string, any>

  export type ExtraPropertyValue<T> = {
    label: string
    value: T
  }

  export type ExpressionValue = {
    value: string
    rawValue: Record<string, any>
  }

  export type ExtraPropertyValuePrimitive = ExtraPropertyValue<string | number | boolean>
  export type ExtraPropertyValueExpression = ExtraPropertyValue<ExpressionValue[]>
  export type ExtraPropertyValueJson = ExtraPropertyValue<any[] | Record<any, any>>

  export type ExtraProperties = {
    primitive: ExtraPropertyValuePrimitive[]
    expression: ExtraPropertyValueExpression[]
    json: ExtraPropertyValueJson[]
  }

  export function parseExtraOptions(nativeProperties: NativeProperties, attributesList: AttributeVM[]): ExtraProperties {
    return Object.entries(nativeProperties)
      .filter(([, v]) => v != null)
      .reduce(
        (acc, [key, value]) => {
          if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
            const primitiveValue: ExtraPropertyValuePrimitive = {
              label: key,
              value: value
            }
            return {...acc, primitive: [...acc.primitive, primitiveValue]}
          }
          else if (typeof value === 'object' && isExpresionProperty(value)) {
            return {...acc, expression: [...acc.expression, expressionValue(key, [value], attributesList)]}
          }
          else if (typeof Array.isArray(value) && value.length && isExpresionProperty(value[0])) {
            return {...acc, expression: [...acc.expression, expressionValue(key, value, attributesList)]}
          }
          else {
            const jsonValue: ExtraPropertyValueJson = {
              label: humanizeCase(key),
              value
            }
            return {...acc, json: [...acc.json, jsonValue]}
          }
        },
        {
          primitive: [],
          expression: [],
          json: []
        }
      )
  }

  function expressionValue(key: string, exprs: Record<string, any>[], attrs: AttributeVM[]): ExtraPropertyValueExpression {
    return {
      label: humanizeCase(key),
      value: exprs.map(e => ({
        value: getText(e, attrs),
        rawValue: e
      }))
    }
  }

  function humanizeCase(str: string): string {
    // "fooBar-Baz_Qux" => "Foo Bar Baz Qux"
    return str
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/(\d)([^\d])/g, '$1 $2')
      .replace(/([^\d])(\d)/g, '$1 $2')
      .split(/[\W_]/)
      .map(s => s.substring(0, 1).toUpperCase() + s.substring(1)).join(" ")
  }

  function isExpresionProperty(propertyValue: Record<string, any>): boolean {
    return propertyValue._typeHint && (propertyValue._typeHint as string).startsWith('expr.')
  }
}
