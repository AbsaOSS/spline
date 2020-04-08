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
import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {combineLatest, Observable, of} from 'rxjs';
import {filter, first, map} from 'rxjs/operators';
import {AppState} from 'src/app/model/app-state';
import {RouterStateUrl} from 'src/app/model/routerStateUrl';
import * as RouterAction from 'src/app/store/actions/router.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent {

  constructor(
    private store: Store<AppState>
  ) { }

  public isActive = (name: string): Observable<boolean> => {
    return this.isSelectedMenuItem(name)
  }

  public isVisible = (name: string): Observable<boolean> => {
    switch (name) {
      case 'lineage-overview':
        return combineLatest(
          this.isSelectedMenuItem(name),
          this.isSelectedMenuItem('lineage-detailed'),
          (item1, item2) => (item1 || item2)
        )
      case 'lineage-detailed':
        return this.isSelectedMenuItem(name)
      default: return of(false)
    }
  }

  private isSelectedMenuItem = (name: string): Observable<boolean> => {
    return this.store.select('router', 'state', 'url')
      .pipe(
        filter(state => state != null),
        map(url => {
          return url.indexOf(name) !== -1
        })
      )
  }

  public onLineageOverviewClick = (): void => {
    this.store
      .select('lineageOverview')
      .pipe(
        first()
      )
      .subscribe(lineage => {
        const params: RouterStateUrl = {
          url: "/app/lineage-overview",
          queryParams: { executionEventId: lineage.lineageInfo.executionEventId }
        }
        this.store.dispatch(new RouterAction.Go(params))
      })
  }


  public onHomeClick = (): void => {
    this.store.dispatch(
      new RouterAction.Go({ url: "/app/dashboard" })
    )
  }

}
