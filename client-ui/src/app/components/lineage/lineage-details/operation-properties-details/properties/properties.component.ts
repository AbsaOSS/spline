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
import { Component, Input, OnDestroy } from '@angular/core'
import { Store } from '@ngrx/store'
import { Subscription } from 'rxjs'
import { ModalExpressionComponent } from 'src/app/components/modal/modal-expression/modal-expression.component'
import { AppState } from 'src/app/model/app-state'
import { Property, PropertyType } from 'src/app/model/property'
import * as ModalAction from 'src/app/store/actions/modal.actions'
import { getOperationColor, getOperationIcon } from 'src/app/util/execution-plan'
import { AttributeVM } from '../../../../../model/viewModels/attributeVM'
import { OperationProperty } from '../../../../../model/operation/operation-property.models'


export abstract class PropertiesComponent implements OnDestroy {

  constructor(private store: Store<AppState>) {
  }

  private subscriptions: Subscription[] = []

  @Input() propertyType: string

  @Input() attributesList: AttributeVM[]

  @Input() nativeProperties: Record<string, any>

  @Input() propertyName: string

  @Input() properties: Property[]

  PropertyType = PropertyType

  getIcon(): string {
    return getOperationIcon(this.propertyType, this.propertyName)
  }

  getColor(): string {
    return getOperationColor(this.propertyType, this.propertyName)
  }

  propertiesContain(propertyType: PropertyType): boolean {
    return this.properties.filter(p => p.type === propertyType).length > 0
  }

  openExprViewDialog(event: Event, property: Property): void {
    event.preventDefault()
    this.subscriptions.push(
      this.store
        .select('executedLogicalPlan', 'executionPlan', 'extra', 'attributes')
        .subscribe(attributes => {
          const initialState = {
            data: property,
            attributes: attributes,
            type: this.propertyName
          }
          this.store.dispatch(new ModalAction.Open(ModalExpressionComponent, { initialState }))
        })
    )
  }

  openPropertyExprViewDialog($event: MouseEvent, expressionProp: OperationProperty.ExtraPropertyValueExpression) {
    // PropertyType.Join does not play any role here
    const property = new Property(
      PropertyType.Join, expressionProp.value.value, expressionProp.value.rawValue
    )
    this.openExprViewDialog($event, property)
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

}
