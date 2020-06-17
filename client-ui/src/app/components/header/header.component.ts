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
import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { filter , map} from 'rxjs/operators'
import { AppState } from 'src/app/model/app-state'
import { Router } from '@angular/router'

declare const __APP_VERSION__: string

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent {

  readonly appVersion: string = __APP_VERSION__

  prevPageUrl$: Observable<string>
  currentPageUrlPrefix$: Observable<string>

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {
    this.prevPageUrl$ = this.store.select('router', 'state', 'queryParams', 'returnUrl')
      .pipe(
        map(url => url || "#")
      )
    this.currentPageUrlPrefix$ = this.store.select('router', 'state', 'url')
      .pipe(
        filter(x => x),
        map(url => /\/app\/[^/?#]+/.exec(url)[0])
      )
  }

  public goToUrl(url: string): void {
    if (url !== "#") {
      this.router.navigateByUrl(url)
    }
  }
}
