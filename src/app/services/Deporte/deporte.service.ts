import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeporteService {

  private API_SERVER = "http://localhost:8080/deporte/"

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAlldeportes(): Observable<any>{
    return this.httpClient.get(this.API_SERVER);
  }

  public getdeportebyid(iddeporte: string): Observable<any>{
    return this.httpClient.get(this.API_SERVER+"byid/"+iddeporte);
  }
}
