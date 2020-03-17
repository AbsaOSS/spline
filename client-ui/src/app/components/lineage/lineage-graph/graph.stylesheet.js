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

const LINE_WIDTH_PLANE = 10
const LINE_WIDTH_HIGHLIGHTED = 20
const LINE_COLOR_PLANE = 'lightgray'
const LINE_COLOR_HIGHLIGHTED = 'magenta'

export const cyStyles = [
  {
    selector: 'core',
    style: {
      'active-bg-size': 0
    }
  },
  {
    selector: 'node',
    style: {
      'background-color': 'whitesmoke',
      'padding': 50
    }
  },
  {
    selector: 'node:selected',
    style: {
      'background-color': LINE_COLOR_PLANE,
      'padding': 80,
    }
  },
  {
    selector: 'node.hlt',
    style: {
      'border-color': LINE_COLOR_HIGHLIGHTED,
      'border-width': LINE_WIDTH_HIGHLIGHTED,
    }
  },
  {
    selector: 'edge',
    style: {
      'line-color': LINE_COLOR_PLANE,
      'target-arrow-color': LINE_COLOR_PLANE,
      'width': LINE_WIDTH_PLANE,
    }
  },
  {
    selector: 'edge.hlt',
    style: {
      'line-color': LINE_COLOR_HIGHLIGHTED,
      'target-arrow-color': LINE_COLOR_HIGHLIGHTED,
      'width': LINE_WIDTH_HIGHLIGHTED,
    }
  }
]
