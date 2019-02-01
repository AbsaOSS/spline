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
import { Component, OnInit } from '@angular/core';
import { LineageGraphService } from 'src/app/services/lineage/lineage-graph.service';

@Component({
  selector: 'schema-details',
  templateUrl: './schema-details.component.html',
  styleUrls: ['./schema-details.component.less']
})
export class SchemaDetailsComponent implements OnInit {

  public detailsInfo: any = null

  constructor(private lineageGraphService: LineageGraphService) { }

  ngOnInit() {
    this.lineageGraphService.detailsInfo.subscribe(detailsInfo => {
      this.detailsInfo = detailsInfo
    })
  }

  getType(): string {
    return this.detailsInfo._typeHint.split('.').pop()
  }

  getInputs() {
    let inputs = []
    this.detailsInfo.mainProps.inputs.forEach(input => {
      inputs.push(this.detailsInfo.mainProps.schemas[input])
    })
    return inputs
  }

  getOutput() {
    return this.detailsInfo.mainProps.schemas[this.detailsInfo.mainProps.output]
  }

}
