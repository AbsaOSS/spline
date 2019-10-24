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
import { AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, OnDestroy, QueryList, ViewChildren, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AppState } from 'src/app/model/app-state';
import { Expression } from 'src/app/model/expression';
import { ExpressionComponents, OperationType } from 'src/app/model/types/operationType';
import { AttributeVM } from 'src/app/model/viewModels/attributeVM';
import { OperationDetailsVM } from 'src/app/model/viewModels/operationDetailsVM';
import { operationColorCodes, operationIconCodes } from 'src/app/store/reducers/execution-plan.reducer';
import { getText } from 'src/app/store/reducers/expression.reducer';


@Component({
  selector: 'schema-details',
  templateUrl: './schema-details.component.html',
  styleUrls: ['./schema-details.component.less']
})
export class SchemaDetailsComponent implements AfterViewInit, OnDestroy {

  @ViewChildren('expressionPanel', { read: ViewContainerRef })
  expressionPanel: QueryList<ViewContainerRef>

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private changedetectorRef: ChangeDetectorRef,
    private store: Store<AppState>
  ) { }

  private subscriptions: Subscription[] = []

  public ngAfterViewInit(): void {
    this.subscriptions.push(
      this.expressionPanel.changes.pipe(
        switchMap(_ =>
          this.store
            .select('detailsInfos')
            .pipe(
              switchMap(detailsInfos => {
                return this.store
                  .select('executedLogicalPlan')
                  .pipe(
                    map(executedLogicalPlan => {
                      return { detailsInfos: detailsInfos, executedLogicalPlan: executedLogicalPlan }
                    })
                  )
              })
            )
        )
      ).
        subscribe(store => {
          const container = this.expressionPanel.first
          if (container && store.detailsInfos) {
            container.clear()
            let type = store.detailsInfos.operation.name
            if (!ExpressionComponents.has(type)) {
              type = OperationType.Generic
            }
            const expressions = this.getExpressions(store.detailsInfos, store.executedLogicalPlan.execution.extra.attributes)
            const factory = this.componentFactoryResolver.resolveComponentFactory(ExpressionComponents.get(type))
            const instance = container.createComponent(factory).instance
            instance.expressions = expressions
            instance.expressionType = type
            if (!this.changedetectorRef['destroyed']) this.changedetectorRef.detectChanges()
          }
        })
    )
  }

  public getDetailsInfo(): Observable<OperationDetailsVM> {
    return this.store.select('detailsInfos')
  }

  public getIcon(operationName: string): string {
    return String.fromCharCode(operationIconCodes.get(operationName) || operationIconCodes.get(OperationType.Generic))
  }

  public getOperationColor(operationName: string): string {
    return operationColorCodes.get(operationName) || operationColorCodes.get(OperationType.Generic)
  }


  private getExpressions(detailsInfos: any, attributeList: any): Expression[] {
    const properties = detailsInfos.operation.properties
    let expressions = []
    switch (properties.name) {
      case OperationType.Join:
        const joinExpression = new Expression(`${properties.joinType} Join On`, getText(properties.condition, attributeList), properties.condition)
        expressions.push(joinExpression)
        break
      case OperationType.Projection:
        if (properties.projectList) {
          properties.projectList.forEach(projection =>
            expressions.push(new Expression("Transformations", getText(projection[1], attributeList), projection[1]))
          )
        }
        let inputs = []
        _.each(detailsInfos.inputs, schemaIndex => inputs = _.concat(inputs, detailsInfos.schemas[schemaIndex]))
        const output = detailsInfos.schemas[detailsInfos.output]
        const diff = _.differenceBy(inputs, output, 'name')
        if (diff.length > 0) {
          diff.map(item => expressions.push(new Expression("Dropped Attributes", item.name, null)))
        }
        break
      case OperationType.Aggregate:
        properties.aggregateExpressions.forEach(aggregate => expressions.push(new Expression("Aggregate", getText(aggregate[1], attributeList), aggregate[1])))
        properties.groupingExpressions.forEach(grouping => expressions.push(new Expression("Grouping", getText(grouping[1], attributeList), grouping[1])))
        break
      case OperationType.LogicalRelation:
        const inputSourceExpression = new Expression("inputSource", properties.inputSources[0], null)
        const inputSourceTypeExpression = new Expression("Type", properties.sourceType, null)
        expressions.push(inputSourceExpression)
        expressions.push(inputSourceTypeExpression)
        break
      case OperationType.Sort:
        properties.order.forEach(order => expressions.push(new Expression("Sort", `${getText(order.expression, attributeList)} ${order.direction}`, order.expression)))
        break
      case OperationType.Filter:
        const filterExpression = new Expression("Filter", getText(properties.condition, attributeList), properties.condition)
        expressions.push(filterExpression)
        break
      default:
        const genericExpression = new Expression(properties.name, properties, null)
        expressions.push(genericExpression)
        break
    }
    return expressions

  }

  public getInputSchemas = (operationDetails: OperationDetailsVM): AttributeVM[] => {
    if (operationDetails) {
      let inputSchemas = []
      operationDetails.inputs.forEach(input => {
        inputSchemas.push(operationDetails.schemas[input])
      })
      return inputSchemas
    } else {
      return null
    }
  }

  public getOutputSchema = (operationDetails: OperationDetailsVM): AttributeVM[] => {
    return operationDetails ? operationDetails.schemas[operationDetails.output] : null
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe())
  }
}

