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
  QueryList,
  Type,
  ViewChildren,
  ViewContainerRef
} from '@angular/core'
import { Store } from '@ngrx/store'
import * as _ from 'lodash'
import { Observable, Subscription } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { AppState } from 'src/app/model/app-state'
import { Property, PropertyType } from 'src/app/model/property'
import { OperationType, PropertiesComponents } from 'src/app/model/types/operationType'
import { AttributeVM } from 'src/app/model/viewModels/attributeVM'
import { OperationDetailsVM } from 'src/app/model/viewModels/operationDetailsVM'
import { getOperationColor, getOperationIcon } from 'src/app/util/execution-plan'
import { getText } from 'src/app/util/expressions'
import { PropertiesComponent } from './properties/properties.component'
import * as RouterAction from '../../../../store/actions/router.actions'


@Component({
  selector: 'operation-properties-details',
  templateUrl: './operation-properties-details.component.html',
  styleUrls: ['./operation-properties-details.component.scss']
})
export class OperationPropertiesDetailsComponent implements AfterViewInit, OnDestroy {

  @ViewChildren('propertiesPanel', { read: ViewContainerRef })
  propertiesPanel: QueryList<ViewContainerRef>

  readonly selectedAttributeId$: Observable<string>
  private subscriptions: Subscription[] = []

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private changeDetectorRef: ChangeDetectorRef,
    private store: Store<AppState>) {
  }

  ngAfterViewInit(): void {
    this.subscriptions.push(
      this.propertiesPanel.changes.pipe(
        switchMap(_ =>
          this.store.select('detailsInfos')
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
        )
      ).subscribe(store => {
        const container = this.propertiesPanel.first
        if (container && store.detailsInfos) {
          container.clear()
          let name = store.detailsInfos.operation.name
          const type = store.detailsInfos.operation._type
          if (!PropertiesComponents.has(name)) {
            name = OperationType.Generic
          }
          let properties: Property[] = []
          let component: Type<PropertiesComponent>
          try {
            properties = this.getProperties(store.detailsInfos, store.attributes)
            component = type === OperationType.Write
              ? PropertiesComponents.get(OperationType.Write)
              : PropertiesComponents.get(name)
          } catch (error) {
            component = PropertiesComponents.get(OperationType.Error)
          } finally {
            const factory = this.componentFactoryResolver.resolveComponentFactory(component)
            const instance = container.createComponent(factory).instance
            instance.properties = properties
            instance.propertyName = name
            instance.propertyType = type
            instance.nativeProperties = store.detailsInfos.operation.properties
          }
          if (!this.changeDetectorRef['destroyed']) {
            this.changeDetectorRef.detectChanges()
          }
        }
      })
    )
  }

  onSelectedAttributeIdChange(attrId: string): void {
    this.store.dispatch(new RouterAction.Go({ queryParams: { attribute: attrId }, url: null }))
  }

  getDetailsInfo(): Observable<OperationDetailsVM> {
    return this.store.select('detailsInfos')
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
    }
    else {
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
        const joinExpression = new Property(PropertyType.Join, `${opInfoProperties.joinType} JOIN ON ${getText(opInfoProperties.condition, attributeList)}`, opInfoProperties.condition)
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
        const filterExpression = new Property(PropertyType.Filter, getText(opInfoProperties.condition, attributeList), opInfoProperties.condition)
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

