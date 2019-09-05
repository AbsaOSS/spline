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
import {Component, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {CytoscapeNgLibComponent} from 'cytoscape-ng-lib';
import {map, switchMap} from 'rxjs/operators';
import {AppState} from 'src/app/model/app-state';

@Component({
  selector: 'attribute-details',
  templateUrl: './attribute-details.component.html',
  styleUrls: ['./attribute-details.component.less']
})
export class AttributeDetailsComponent implements OnInit {

  @ViewChild(CytoscapeNgLibComponent, { static: true })
  private cytograph: CytoscapeNgLibComponent

  constructor(
    private store: Store<AppState>
  ) { }

  public ngOnInit(): void {
    this.store
      .select('layout')
      .pipe(
        switchMap(layout =>
          this.store
            .select('attributes')
            .pipe(
              map(attributes => ({ attributes, layout }))
            )
        )
      )
      .subscribe(state => {
        if (this.cytograph.cy) {
          this.cytograph.cy.remove(this.cytograph.cy.elements())
          if (state.attributes) {
            this.cytograph.cy.add(state.attributes)
            this.cytograph.cy.layout(state.layout).run()
            this.cytograph.cy.panzoom()
          }
        }
      })
  }


}
