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
import { Component, ComponentFactoryResolver, ViewContainerRef, AfterViewInit, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { LineageGraphService } from 'src/app/services/lineage/lineage-graph.service';
import { OperationType, ExpressionComponents } from 'src/app/types/operationType';
import { IExpression, ILiteral, IBinary, IAttrRef, IAlias, IUDF, IGenericLeaf, IGeneric } from 'src/app/viewModels/expression-model';
import * as _ from 'lodash';
import { Expression } from 'src/app/viewModels/expression';
import { ExpressionType } from 'src/app/types/expressionType';
import { ExecutedLogicalPlanVM } from 'src/app/viewModels/executedLogicalPlanVM';


@Component({
  selector: 'schema-details',
  templateUrl: './schema-details.component.html',
  styleUrls: ['./schema-details.component.less']
})
export class SchemaDetailsComponent implements AfterViewInit {

  @ViewChildren('expressionPanel', { read: ViewContainerRef })
  expressionPanel: QueryList<ViewContainerRef>

  constructor(
    private lineageGraphService: LineageGraphService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private changedetectorRef: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
    this.expressionPanel.changes.subscribe(_ => {
      const container = this.expressionPanel.first
      if (container) {
        container.remove(0)
      }
      if (this.getDetails()) {
        const type = this.getType(this.getDetails())
        const factory = this.componentFactoryResolver.resolveComponentFactory(ExpressionComponents.get(type))
        let instance = container.createComponent(factory).instance
        instance.expressions = this.getExpressions(this.getDetails())
        instance.expressionType = type
        this.changedetectorRef.detectChanges()
      }
    })
  }

  getDetails(): any {
    return this.lineageGraphService.detailsInfo
  }

  getIcon(): string {
    return this.getDetails() ? String.fromCharCode(this.lineageGraphService.getIconFromOperationType(this.getType(this.getDetails()))) : undefined
  }

  getOperationColor(): string {
    return this.getDetails() ? this.lineageGraphService.getColorFromOperationType(this.getType(this.getDetails())) : undefined
  }

  getType(property?: any): any {
    if (!property) {
      property = this.getDetails()
    }
    return property._typeHint ? property._typeHint.split('.').pop() : undefined
  }

  getExpressions(property: any): Expression[] {
    let expressions = []
    switch (this.getType(property)) {
      case OperationType.Join:
        // Build the join expression
        const title = property.joinType
        const values = [property.condition.text]
        const expression = new Expression(title, values)
        expressions.push(expression)
        break
      case OperationType.Projection:
        // Build the transformations expressions
        if (property.transformations) {
          const title = "Transformations"
          const values = new Array()
          _.each(property.transformations, transformation => values.push(this.getText(transformation)))
          const transformationExpression: Expression = new Expression(title, values)
          expressions.push(transformationExpression)
        }
        // Build the dropped Attributes expressions
        let inputs = []
        _.each(property.mainProps.inputs, schemaIndex => inputs = _.concat(inputs, property.mainProps.schemas[schemaIndex]))
        const output = property.mainProps.schemas[property.mainProps.output]
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

  getInputs(): any[] {
    if (this.getDetails()) {
      let inputs = []
      this.getDetails().mainProps.inputs.forEach(input => {
        inputs.push(this.getDetails().mainProps.schemas[input])
      })
      return inputs
    } else {
      return null
    }
  }

  getOutput(): any {
    return this.getDetails() ? this.getDetails().mainProps.schemas[this.getDetails().mainProps.output] : null
  }

  getExecutionPlanVM(): ExecutedLogicalPlanVM {
    return this.lineageGraphService.executedLogicalPlan
  }
}

