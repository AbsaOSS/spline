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

import {ChangeDetectionStrategy, Component, Input} from '@angular/core'
import {Position} from './graph-toolbar.model'


@Component({
  selector: 'graph-toolbar',
  templateUrl: './graph-toolbar.component.html',
  styleUrls: ['./graph-toolbar.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphToolbarComponent {

  positionCSS: string[]

  @Input() title?: string

  @Input() set position(pos: Position) {
    this.positionCSS = GraphToolbarComponent.toPositionCSS(pos)
  }

  private static toPositionCSS(pos: Position): string[] {
    switch (pos) {
      case "top-left" :
        return ["top", "left"]
      case "top-right" :
        return ["top", "right"]
      case "bottom-right" :
        return ["bottom", "right"]
      case "bottom-left" :
        return ["bottom", "left"]
      default :
        throw `Unexpected position: ${pos}`
    }
  }

}
