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
import {Component, Input} from '@angular/core';
import {SchemaType} from 'src/app/model/types/schemaType';
import {AttributeVM, StructFieldVM} from "../../../../model/viewModels/attributeVM";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'schema',
  templateUrl: './schema.component.html'
})
export class SchemaComponent {

  @Input()
  public schemaType: SchemaType

  @Input()
  public schema: AttributeVM[]

  public selectedAttribute$: Observable<AttributeVM>

  constructor(
    private router: Router,
    private route: ActivatedRoute) {

    this.selectedAttribute$ =
      route.queryParams.pipe(
        map((params: Params) =>
          this.schema.find(a => a.id === params.attribute)))
  }

  public onAttributeSelected(attr: StructFieldVM) {
    const attrId = (attr as AttributeVM).id
    this.router.navigate([], {
      relativeTo: this.route,
      queryParamsHandling: "merge",
      queryParams: {
        attribute: attrId
      }
    })
  }
}
