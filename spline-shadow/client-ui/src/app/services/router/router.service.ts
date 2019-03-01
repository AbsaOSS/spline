import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) { }

  public getParams() {
    return this.activatedRoute.queryParamMap
  }

  public mergeParam(param: Params, saveState: boolean = false) {
    const url = this.router
      .createUrlTree([], {
        relativeTo: this.activatedRoute,
        queryParams: param,
        queryParamsHandling: "merge"
      }).toString()
    if (saveState) {
      this.location.go(url)
    } else {
      this.location.replaceState(url)
    }
  }

}
