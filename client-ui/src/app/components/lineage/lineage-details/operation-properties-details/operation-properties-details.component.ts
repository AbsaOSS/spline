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
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core'
import { Store } from '@ngrx/store'
import * as _ from 'lodash'
import { Observable, Subscription } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { AppState } from 'src/app/model/app-state'
import { Property, PropertyType } from 'src/app/model/property'
import {
  getOperationPropertiesComponentType,
  OperationType,
  OPERATION_PROPERTY_COMPONENT_TYPE_MAP
} from 'src/app/model/types/operation-type'
import { AttributeVM } from 'src/app/model/viewModels/attributeVM'
import { OperationDetailsVM } from 'src/app/model/viewModels/operationDetailsVM'
import { getOperationColor, getOperationIcon } from 'src/app/util/execution-plan'
import { getText } from 'src/app/util/expressions'

import * as RouterAction from '../../../../store/actions/router.actions'

import { PropertiesComponent } from './properties/properties.component'


@Component({
  selector: 'operation-properties-details',
  templateUrl: './operation-properties-details.component.html',
  styleUrls: ['./operation-properties-details.component.scss']
})
export class OperationPropertiesDetailsComponent implements AfterViewInit, OnDestroy {

  @ViewChild('propertiesPanel', { read: ViewContainerRef }) propertiesPanelContainerViewRef: ViewContainerRef

  readonly selectedAttributeId$: Observable<string>
  readonly detailsInfos$: Observable<OperationDetailsVM>
  private subscriptions: Subscription[] = []

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private changeDetectorRef: ChangeDetectorRef,
    private store: Store<AppState>) {

    this.selectedAttributeId$ = this.store.select('router', 'state', 'queryParams', 'attribute')
    this.detailsInfos$ = this.store.select('detailsInfos')

  }

  ngAfterViewInit(): void {
    const subs = this.store.select('detailsInfos')
      .pipe(
        switchMap(detailsInfos => {
          return this.store.select('executedLogicalPlan', 'executionPlan', 'extra', 'attributes')
            .pipe(
              map(attributes => {
                return { detailsInfos: detailsInfos, attributes: attributes }
              })
            )
        })
      )
      .subscribe(store => {
        const container = this.propertiesPanelContainerViewRef
        if (container && store.detailsInfos) {
          const operationName = !OPERATION_PROPERTY_COMPONENT_TYPE_MAP.has(store.detailsInfos.operation.name)
            ? OperationType.Generic
            : store.detailsInfos.operation.name

          const operationType = store.detailsInfos.operation._type

          let properties: Property[] = []
          let componentType: Type<PropertiesComponent>

          try {
            properties = this.getProperties(store.detailsInfos, store.attributes)
            componentType = getOperationPropertiesComponentType(operationType as OperationType, operationName)

          } catch (error) {

            componentType = OPERATION_PROPERTY_COMPONENT_TYPE_MAP.get(OperationType.Error)

          } finally {
            // clear container
            container.clear()
            // create component
            const factory = this.componentFactoryResolver.resolveComponentFactory(componentType)
            const instance = container.createComponent(factory).instance
            // init component
            instance.properties = properties
            instance.propertyName = operationName
            instance.propertyType = operationType
            instance.nativeProperties = store.detailsInfos.operation.properties
          }
          if (!this.changeDetectorRef['destroyed']) {
            this.changeDetectorRef.detectChanges()
          }
        }
      })

    this.subscriptions.push(subs)
  }

  onSelectedAttributeIdChange(attrId: string): void {
    this.store.dispatch(new RouterAction.Go({ queryParams: { attribute: attrId }, url: null }))
  }

  getIcon(operationType: string, operationName: string): string {
    return getOperationIcon(operationType, operationName)
  }

  getColor(operationType: string, operationName: string): string {
    return getOperationColor(operationType, operationName)
  }

  getInputSchemas = (operationDetails: OperationDetailsVM): AttributeVM[] => {
    if (operationDetails) {
      const inputSchemas = []
      operationDetails.inputs.forEach(input => {
        inputSchemas.push(operationDetails.schemas[input])
      })
      return inputSchemas
    } else {
      return null
    }
  }

  getOutputSchema = (operationDetails: OperationDetailsVM): AttributeVM[] => {
    return operationDetails && operationDetails.schemas[operationDetails.output]
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

  private getProperties(operationDetails: OperationDetailsVM, attributeList: any): Property[] {
    const opInfoProperties = operationDetails.operation.properties
    const properties = []

    if (operationDetails.operation._type === OperationType.Write) {
      properties.push(new Property(PropertyType.OutputSource, opInfoProperties.outputSource))
      properties.push(new Property(PropertyType.SourceType, opInfoProperties.destinationType))
      properties.push(new Property(PropertyType.Append, opInfoProperties.append))
      return properties
    }

    switch (opInfoProperties.name) {
      case OperationType.Join:
        const joinExpression = new Property(
          PropertyType.Join, `${opInfoProperties.joinType} JOIN ON ${getText(opInfoProperties.condition, attributeList)}`,
          opInfoProperties.condition
        )
        properties.push(joinExpression)
        break
      case OperationType.Projection:
        if (opInfoProperties.projectList) {
          (opInfoProperties.projectList as any).forEach(
            projection => properties.push(
              new Property(PropertyType.Transformations, getText(projection, attributeList), projection)
            )
          )
        }
        let inputs = []
        _.each(operationDetails.inputs, schemaIndex => inputs = _.concat(inputs, operationDetails.schemas[schemaIndex]))
        const output = operationDetails.schemas[operationDetails.output]
        const diff = _.differenceBy(inputs, output, 'name')
        diff.forEach(
          item => properties.push(
            new Property(PropertyType.DroppedAttributes, item.name)
          )
        )
        break
      case OperationType.Aggregate:
        const aggregateExpressions = (opInfoProperties.aggregateExpressions as any)
        aggregateExpressions.forEach(
          aggregate => {
            properties.push(
              new Property(PropertyType.Aggregate, getText(aggregate, attributeList), aggregate)
            )
          }
        )
        const groupingExpressions = (opInfoProperties.groupingExpressions as any)
        groupingExpressions.forEach(
          grouping => properties.push(
            new Property(PropertyType.Grouping, getText(grouping, attributeList), grouping)
          )
        )
        break
      case OperationType.LogicalRelation:
        (opInfoProperties.inputSources as any).forEach(
          inputSource => properties.push(
            new Property(PropertyType.InputSource, inputSource)
          )
        )
        const inputSourceTypeExpression = new Property(PropertyType.SourceType, opInfoProperties.sourceType)
        properties.push(inputSourceTypeExpression)
        break
      case OperationType.Sort:
        (opInfoProperties.order as any).forEach(
          order => properties.push(
            new Property(PropertyType.Sort, `${getText(order.expression, attributeList)} ${order.direction}`, order.expression)
          )
        )
        break
      case OperationType.Filter:
        const filterExpression = new Property(
          PropertyType.Filter, getText(opInfoProperties.condition, attributeList), opInfoProperties.condition
        )
        properties.push(filterExpression)
        break
      case OperationType.Alias:
        properties.push(new Property(PropertyType.Alias, opInfoProperties.alias))
        break
      default:
        const genericExpression = new Property(PropertyType.Properties, opInfoProperties)
        properties.push(genericExpression)
        break
    }
    return properties

  }
}

