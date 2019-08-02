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
import { AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, QueryList, ViewChildren, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { AppState } from 'src/app/model/app-state';
import { Expression } from 'src/app/model/expression';
import { IAlias, IAttrRef, IBinary, IExpression, IGeneric, IGenericLeaf, ILiteral, IUDF } from 'src/app/model/expression-model';
import { ExpressionType } from 'src/app/model/types/expressionType';
import { ExpressionComponents, OperationType } from 'src/app/model/types/operationType';
import { AttributeVM } from 'src/app/model/viewModels/attributeVM';
import { ExecutedLogicalPlanVM } from 'src/app/model/viewModels/executedLogicalPlanVM';
import { OperationDetailsVM } from 'src/app/model/viewModels/operationDetailsVM';
import { operationColorCodes, operationIconCodes } from 'src/app/store/reducers/execution-plan.reducer';


@Component({
  selector: 'schema-details',
  templateUrl: './schema-details.component.html',
  styleUrls: ['./schema-details.component.less']
})
export class SchemaDetailsComponent implements AfterViewInit {

  @ViewChildren('expressionPanel', { read: ViewContainerRef })
  expressionPanel: QueryList<ViewContainerRef>

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private changedetectorRef: ChangeDetectorRef,
    private store: Store<AppState>
  ) { }

  public ngAfterViewInit(): void {
    this.expressionPanel.changes.pipe(
      switchMap(_ => {
        return this.store.select('detailsInfos')
      }),
      tap(opDetails => {
        const container = this.expressionPanel.first
        if (container && opDetails) {
          container.remove(0)
          const type = opDetails.operation.name
          const factory = this.componentFactoryResolver.resolveComponentFactory(ExpressionComponents.get(type))
          const instance = container.createComponent(factory).instance
          instance.expressions = this.getExpressions(opDetails)
          instance.expressionType = type
          this.changedetectorRef.detectChanges()
        }
      })
    )
  }

  public getDetailsInfo(): Observable<OperationDetailsVM> {
    return this.store.select('detailsInfos')
  }

  public getExecutionPlanVM(): Observable<ExecutedLogicalPlanVM> {
    return this.store.select('executedLogicalPlan')
  }

  public getIcon(operationName: string): string {
    return String.fromCharCode(operationIconCodes.get(operationName) || operationIconCodes.get(OperationType.Generic))
  }

  public getOperationColor(operationName: string): string {
    return operationColorCodes.get(operationName) || operationColorCodes.get(OperationType.Generic)
  }

  private getType(attribute?: any): string {
    return attribute._type
  }

  private getExpressions(attribute: any): Expression[] {
    let expressions = []
    switch (attribute._type) {
      case OperationType.Join:
        // Build the join expression
        const title = attribute.joinType
        const values = [attribute.condition.text]
        const expression = new Expression(title, values)
        expressions.push(expression)
        break
      case OperationType.Projection:
        // Build the transformations expressions
        if (attribute.transformations) {
          const title = "Transformations"
          const values = new Array()
          attribute.transformations.forEach(transformation => values.push(this.getText(transformation)))
          const transformationExpression: Expression = new Expression(title, values)
          expressions.push(transformationExpression)
        }
        // Build the dropped Attributes expressions
        let inputs = []
        _.each(attribute.inputs, schemaIndex => inputs = _.concat(inputs, attribute.schemas[schemaIndex]))
        const output = attribute.schemas[attribute.output]
        const diff = _.differenceBy(inputs, output, 'name')
        if (diff.length > 0) {
          const title = "Dropped Attributes"
          const values = diff.map(item => item.name);
          const droppedAttributes = new Expression(title, values)
          expressions.push(droppedAttributes)
        }
        break
      //TODO : Implement the other expressions for the other types
    }
    return expressions

  }

  public getText(expr: IExpression): string {
    switch (this.getType(expr)) {
      case ExpressionType.Literal: {
        return (expr as ILiteral).value
      }
      case ExpressionType.Binary: {
        const binaryExpr = <IBinary>expr
        const leftOperand = binaryExpr.children[0]
        const rightOperand = binaryExpr.children[1]
        const render = (operand: IExpression) => {
          const text = this.getText(operand)
          return this.getType(operand) == "Binary" ? `(${text})` : text
        }
        //TODO : This should be the same, to verify. 
        //console.log(`${render(leftOperand)} ${binaryExpr.symbol} ${render(rightOperand)}`)
        //this.renderValue(leftOperand) + " " + binaryExpr + " "+ this.renderValue(rightOperand) 
        return `${render(leftOperand)} ${binaryExpr.symbol} ${render(rightOperand)}`
      }
      case ExpressionType.Alias: {
        const ae = <IAlias>expr
        return this.getText(ae.child) + " AS " + ae.alias
      }
      case ExpressionType.UDF: {
        const udf = <IUDF>expr
        const paramList = _.map(udf.children, child => this.getText(child))
        return "UDF:" + udf.name + "(" + _.join(paramList, ", ") + ")"
      }
      case ExpressionType.AttrRef: {
        const ar = <IAttrRef>expr
        //TODO : put the expression in the mock data not the reference to it
        return ar.refId
      }
      case ExpressionType.GenericLeaf: {
        return this.renderAsGenericLeafExpr(expr as IGenericLeaf)
      }
      case ExpressionType.Generic: {
        const leafText = this.renderAsGenericLeafExpr(expr as IGenericLeaf)
        const childrenTexts = (expr as IGeneric).children.map(child => this.getText(child))
        return leafText + _.join(childrenTexts, ", ")
      }
    }
  }

  private renderAsGenericLeafExpr(gle: IGenericLeaf): string {
    const paramList = _.map(gle.params, (value, name) => name + "=" + this.renderValue(value))
    return _.isEmpty(paramList) ? gle.name : gle.name + "[" + _.join(paramList, ", ") + "]"
  }

  private renderValue(obj: any): string {
    if (this.getType(obj)) {
      return this.getText(obj as IExpression)
    } else {
      return JSON.stringify(obj)
    }
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

}

