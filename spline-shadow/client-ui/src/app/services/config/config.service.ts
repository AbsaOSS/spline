import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  static settings: any;

  constructor(private http: HttpClient) { }

  load(environment: any) {
    if (window["SplineConfiguration"]) {
      return new Promise<void>((resolve, reject) => {
        ConfigService.settings = window["SplineConfiguration"]
        resolve();
      });
    } else {
      const jsonFile = `${environment.configFile}`
      return new Promise<void>((resolve, reject) => {
        this.http.get(jsonFile).toPromise().then((response: any) => {
          ConfigService.settings = <any>response;
          resolve();
        }).catch((response: any) => {
          reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
        });
      });
    }
  }
}
