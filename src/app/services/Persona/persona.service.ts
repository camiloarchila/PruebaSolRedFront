import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private API_SERVER = "http://localhost:8080/persona/"

  constructor(
    private httpClient: HttpClient
  ) { }

  public getallpersonas(): Observable<any>{
    return this.httpClient.get(this.API_SERVER);
  }

  public savepersona(persona:any): Observable<any>{
    return this.httpClient.post(this.API_SERVER, persona);
  }

  public deletepersona(id: string): Observable<any>{
    return this.httpClient.delete(this.API_SERVER+"delete/"+id);
  }
}
