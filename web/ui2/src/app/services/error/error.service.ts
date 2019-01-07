import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ErrorService {

  constructor() { }


  /**
   * Get the text error according to the http code passed in parameters
   * 
   * @param httpCode 
   */
  public getTextError(httpCode: string): string {
    let codeNumber = Number(httpCode)
    switch (codeNumber) {
      case 404: return "404 ! Could not find the requested lineage"
      default: return "OUPS, Something went wrong !"
    }
  }
}
