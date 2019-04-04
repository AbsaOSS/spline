/*
 * Copyright 2017 ABSA Group Limited
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
import { Component, OnInit, ViewChild } from '@angular/core';
import { PropertyService } from 'src/app/services/details/property.service';
import { CytoscapeNgLibComponent } from 'cytoscape-ng-lib';
import { LayoutService } from 'src/app/services/lineage/layout.service';

@Component({
  selector: 'property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.less']
})
export class PropertyDetailsComponent implements OnInit {

  @ViewChild(CytoscapeNgLibComponent)
  private cytograph: CytoscapeNgLibComponent

  constructor(
    private propertyService: PropertyService,
    private layoutService: LayoutService
  ) { }

  ngOnInit(): void {
    let that = this
    this.propertyService.currentProperty.subscribe(property => {
      if (that.cytograph.cy) {
        that.cytograph.cy.remove(that.cytograph.cy.elements())
        if (property) {
          let graph = that.propertyService.buildPropertyGraph(property, null, null)
          that.cytograph.cy.add(graph)

          that.cytograph.cy.layout(that.layoutService.getConfiguration()).run()
          that.cytograph.cy.panzoom()
        }
      }
    })
  }


}
