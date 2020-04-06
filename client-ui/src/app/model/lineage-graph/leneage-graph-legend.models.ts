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


import { LINE_COLOR_HLT_IMPACT, LINE_COLOR_HLT_LINEAGE, LINE_COLOR_HLT_PRIMARY } from './leneage-graph.models'


export type LineageGraphLegend = {
  title: string
  color: string
  description: string
}

export type LineageGraphLegendKeys =
  'Usage' |
  'Lineage' |
  'Impact'

export const LineageGraphLegends: { [key in LineageGraphLegendKeys]: LineageGraphLegend } =
  Object.freeze({
    Usage: {
      title: 'Usage',
      color: LINE_COLOR_HLT_PRIMARY,
      description: `
          Usage - consists of operations that have the selected attribute in their output.
          I.e operations that either create the attribute or propagate through.
      `
    },
    Lineage: {
      title: 'Lineage',
      color: LINE_COLOR_HLT_LINEAGE,
      description: `
          Lineage - outlines operations that produces or propagate attributes that affects the
          selected one transitively (at any level of nesting). In other words, the operations containing
          attributes which the selected attribute depends on.
      `
    },
    Impact: {
      title: 'Impact',
      color: LINE_COLOR_HLT_IMPACT,
      description: `
          Impact - the part of the graph affected by the selected attribute (opposite to the lineage part).
          That is, the operations that produces/propagate attributes that depend on selected one transitively.
      `
    }
  })

