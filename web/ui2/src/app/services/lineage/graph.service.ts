import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class GraphService {

  constructor(private http: HttpClient) { }

  // TODO : Define constants to the whole app in a seperated file with a service accessor
  private mockRestApi = 'http://localhost:3000/lineage/datasourceId/timestamp';

  /**
   * Get the graph data from the API
   * TODO : Specify the return type when the API will be finished
   */
  public getGraphData(nodeFocus: string = null, depth: number = null): Observable<any> {
    // TODO : Use a Url Builder Service 
    let url = this.mockRestApi;
    if (nodeFocus && depth) {
      url = url + "/" + nodeFocus + "/" + depth;
    }
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`
    }
    return throwError(errorMessage)
  }

}
