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

import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from 'src/app/model/app-state';
import {Get} from 'src/app/store/actions/error.actions';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.less']
})
export class ErrorComponent implements OnInit {

  constructor(
    private store: Store<AppState>
  ) { }

  public ngOnInit(): void {
    this.store
      .select('router', 'state', 'params')
      .subscribe(params => this.store.dispatch(new Get(params.httpCode)))
  }

  public getError = (): Observable<string> => {
    return this.store.select('error')
  }

}
