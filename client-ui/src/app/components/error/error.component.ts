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

import { Component, OnDestroy, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable, Subscription } from 'rxjs'
import { AppState } from 'src/app/model/app-state'
import { ApplicationErrorGet } from 'src/app/store/actions/error.actions'


@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = []

  constructor(
    private store: Store<AppState>
  ) {
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.store
        .select('router', 'state', 'params')
        .subscribe(params => this.store.dispatch(new ApplicationErrorGet(params.httpCode)))
    )
  }

  getError = (): Observable<string> => {
    return this.store.select('error')
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

}
