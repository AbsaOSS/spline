import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class GraphService {

  constructor(private http: HttpClient) { }

  private mockRestApi = 'http://localhost:3000/lineage/datasourceId/timestamp';

  public getGraphData() {
    return this.http.get(this.mockRestApi)
  }

}
