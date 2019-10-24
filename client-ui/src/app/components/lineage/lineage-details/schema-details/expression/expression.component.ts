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
import { Component, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ModalExpressionComponent } from 'src/app/components/modal/modal-expression/modal-expression.component';
import { AppState } from 'src/app/model/app-state';
import { Expression } from 'src/app/model/expression';
import { OperationType } from 'src/app/model/types/operationType';
import { operationColorCodes, operationIconCodes } from 'src/app/store/reducers/execution-plan.reducer';
import * as ModalAction from 'src/app/store/actions/modal.actions';

@Component({
  selector: 'app-expression',
  template: ''
})
export class ExpressionComponent implements OnDestroy {

  constructor(private store: Store<AppState>) { }

  private subscriptions: Subscription[] = []

  @Input()
  expressionType: string

  @Input()
  expressions: Expression[]

  public getIcon(): string {
    return String.fromCharCode(operationIconCodes.get(this.expressionType) || operationIconCodes.get(OperationType.Generic))
  }

  public getOperationColor(): string {
    return operationColorCodes.get(this.expressionType) || operationColorCodes.get(OperationType.Generic)
  }

  openExprViewDialog(event: Event, expression: Expression) {
    event.preventDefault()
    this.subscriptions.push(
      this.store
        .select('executedLogicalPlan', 'execution', 'extra', 'attributes')
        .subscribe(attributes => {
          const initialState = {
            data: expression,
            attributes: attributes,
            title: this.expressionType
          }
          this.store.dispatch(new ModalAction.Open(ModalExpressionComponent, { initialState }))
        })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

}
