import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TorneoDeporteService {

  private API_SERVER = "http://localhost:8080/torneodeporte/"

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAlltorneodeportes(): Observable<any>{
    return this.httpClient.get(this.API_SERVER+'all/');
  }

  public getdeportesbyidtorneo(idtorneo: string): Observable<any>{
    return this.httpClient.get(this.API_SERVER+"bytorneoid/"+idtorneo);
  }

  public gettorneodeportebyids(idtorneo: string, iddeporte: string): Observable<any>{
    return this.httpClient.get(this.API_SERVER+"byids/"+idtorneo+"/"+iddeporte);
  }
}
