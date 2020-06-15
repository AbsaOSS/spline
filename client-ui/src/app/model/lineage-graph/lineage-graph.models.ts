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

import { Stylesheet } from 'cytoscape'


export const LINE_WIDTH_PLANE = 10
export const LINE_WIDTH_HIGHLIGHTED = 10
export const LINE_WIDTH_SELECTED = 16
export const LINE_COLOR_PLANE = '#e0e0e0'
export const LINE_COLOR_SELECTED = 'orange'
export const LINE_COLOR_HLT_PRIMARY = 'black'
export const LINE_COLOR_HLT_LINEAGE = 'magenta'
export const LINE_COLOR_HLT_IMPACT = 'green'
export const LINE_COLOR_HLT_NONE = '#eaeaea'

export const selectedNodeStyles = {
  'border-color': LINE_COLOR_SELECTED,
  'border-width': LINE_WIDTH_SELECTED,
  'padding': 70,
}

export const cyStyles: Partial<Stylesheet>[] = [
  {
    selector: 'core',
    style: {
      'active-bg-size': 0
    },
  } as Stylesheet,
  {

    selector: 'node',
    style: {
      'background-color': '#fff',
      'border-color': LINE_COLOR_HLT_NONE,
      'border-width': LINE_WIDTH_HIGHLIGHTED,
      'padding': 50, // that settings is not a part of the Stylesheet for now (it is a bug and it will be fixed in the future).
      'content': 'data(name)',
      'text-valign': 'bottom',
      'text-margin-y': 12,
    },
  } as Stylesheet,
  {
    selector: 'node:selected',
    style: {
      ...selectedNodeStyles
    },
  } as Stylesheet,
  {
    selector: 'node.root',
    style: {
      'background-color': '#333333',
    },
  } as Stylesheet,
  {
    selector: 'node.hlt_prim',
    style: {
      'border-color': LINE_COLOR_HLT_PRIMARY,
      'border-width': LINE_WIDTH_HIGHLIGHTED,
    }
  },
  {
    selector: 'node.hlt_prim:selected',
    style: {
      ...selectedNodeStyles
    }
  },
  {
    selector: 'node.hlt_lin',
    style: {
      'border-color': LINE_COLOR_HLT_LINEAGE,
      'border-width': LINE_WIDTH_HIGHLIGHTED,
    }
  },
  {
    selector: 'node.hlt_lin:selected',
    style: {
      ...selectedNodeStyles
    }
  },
  {
    selector: 'node.hlt_imp',
    style: {
      'border-color': LINE_COLOR_HLT_IMPACT,
      'border-width': LINE_WIDTH_HIGHLIGHTED,
    }
  },
  {
    selector: 'node.hlt_imp:selected',
    style: {
      ...selectedNodeStyles
    }
  },
  {
    selector: 'node.hlt_none',
    style: {
      'border-color': LINE_COLOR_HLT_NONE,
      'border-width': LINE_WIDTH_HIGHLIGHTED,
    }
  },
  {
    selector: 'node.hlt_none:selected',
    style: {
      ...selectedNodeStyles
    }
  },
  {
    selector: 'edge',
    style: {
      'line-color': LINE_COLOR_PLANE,
      'target-arrow-color': LINE_COLOR_PLANE,
      'width': LINE_WIDTH_PLANE,
      'curve-style': 'bezier',
      'target-arrow-shape': 'triangle',
      'arrow-scale': 1.5,
    },
    css: {
      'label': (el) => el.data('label') || '',
      'curve-style': 'bezier',
    }
  },
  {
    selector: 'edge.hlt_prim',
    style: {
      'line-color': LINE_COLOR_HLT_PRIMARY,
      'target-arrow-color': LINE_COLOR_HLT_PRIMARY,
      'width': LINE_WIDTH_HIGHLIGHTED,
    }
  },
  {
    selector: 'edge.hlt_lin',
    style: {
      'line-color': LINE_COLOR_HLT_LINEAGE,
      'target-arrow-color': LINE_COLOR_HLT_LINEAGE,
      'width': LINE_WIDTH_HIGHLIGHTED,
    }
  },
  {
    selector: 'edge.hlt_imp',
    style: {
      'line-color': LINE_COLOR_HLT_IMPACT,
      'target-arrow-color': LINE_COLOR_HLT_IMPACT,
      'width': LINE_WIDTH_HIGHLIGHTED,
    }
  },
  {
    selector: 'edge.hlt_none',
    style: {
      'line-color': LINE_COLOR_HLT_NONE,
      'target-arrow-color': LINE_COLOR_HLT_NONE,
      'width': LINE_WIDTH_HIGHLIGHTED,
    }
  },
]
