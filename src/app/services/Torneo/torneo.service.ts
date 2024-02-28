import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TorneoService {

  private API_SERVER = "http://localhost:8080/torneo/"

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllTorneos(): Observable<any>{
    return this.httpClient.get(this.API_SERVER);
  }

  public getTorneobyid(idtorneo: string): Observable<any>{
    return this.httpClient.get(this.API_SERVER+"byid/"+idtorneo)
  }
}
