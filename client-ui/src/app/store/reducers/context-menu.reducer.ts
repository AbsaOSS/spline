/*
 * Copyright 2019 ABSA Group Limited
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
import * as ContextMenuAction from '../actions/context-menu.actions';
import { LineageOverviewNodeType } from 'src/app/model/types/lineageOverviewNodeType';

export type Action = ContextMenuAction.ContextMenuActions

export function contextMenuReducer(state: string, action: Action): any {
    switch (action.type) {
        case ContextMenuAction.ContextMenuActionTypes.CONTEXT_MENU_GET: return getConfiguration()
        default: return state
    }
}

function getConfiguration(): any {
    return {
        menuRadius: 120, // the radius of the circular menu in pixels
        selector: 'node', // elements matching this Cytoscape.js selector will trigger cxtmenus
        fillColor: 'rgba(0, 0, 0, 0.75)', // the background colour of the menu
        activeFillColor: 'rgba(1, 105, 217, 0.75)', // the colour used to indicate the selected command
        activePadding: 20, // additional size in pixels for the active command
        indicatorSize: 20, // the size in pixels of the pointer to the active command
        separatorWidth: 0, // the empty spacing in pixels between successive commands
        spotlightPadding: 20, // extra spacing in pixels between the element and the spotlight
        minSpotlightRadius: 20, // the minimum radius in pixels of the spotlight
        maxSpotlightRadius: 20, // the maximum radius in pixels of the spotlight
        openMenuEvents: 'cxttapstart taphold', // space-separated cytoscape events that will open the menu; only `cxttapstart` and/or `taphold` work here
        itemColor: 'orange', // the colour of text in the command's content
        itemTextShadowColor: 'transparent', // the text shadow colour of the command's content
        zIndex: 9999, // the z-index of the ui div
        atMouse: false, // draw menu at mouse position
        commands: [
            {
                content: '<span class="fa fa-crop fa-2x"></span><b>Expand</b>',
                select: function (ele) {
                    console.log(ele)
                },
                enabled: false
            },
            {
                content: '<span class="fa fa-info-circle fa-2x"></span><b>Focus</b>',
                select: function (ele, event) {
                    if (ele.data()._type == LineageOverviewNodeType.Execution) {
                        document.location.href = "/app/partial-lineage/" + ele.data().id
                    }
                }
            }
        ]
    }

}