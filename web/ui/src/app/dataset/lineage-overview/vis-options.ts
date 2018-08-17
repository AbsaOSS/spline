/*
 * Copyright 2017 Barclays Africa Group Limited
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

import {Options} from "vis";

export const visOptions: Options = {

    autoResize: true,
    interaction: {
        hover: true,
        selectConnectedEdges: false,
        hoverConnectedEdges: false
    },
    layout: {
        hierarchical: {
            enabled: true,
            sortMethod: 'directed',
            direction: 'UD',
            parentCentralization: true,
            nodeSpacing: 200,
            levelSeparation: 200
        }
    },
    physics: {
        enabled: true,
        hierarchicalRepulsion: {
            nodeDistance: 250,
            springLength: 150,
            springConstant: 10,
            damping: 1
        }
    },

    edges: {
        color: {
            color: '#E0E0E0',
            hover: '#E0E0E0',
            highlight: 'E0E0E0'
        },
        shadow: false,
        width: 10,
        arrows: "to",
        font: {
            color: '#343434',
            background: '#ffffff',
            strokeWidth: 0
        }
    },
    nodes: {
        shape: 'icon',
        shadow: false,
        // margin: 10,
        labelHighlightBold: false,
        font: {
            color: '#343434',
            size: 20
        }
    }
}
