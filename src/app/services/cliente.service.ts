import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Cliente } from '../models/cliente.model';

import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private baseUrl = environment.base_url;

  constructor(private http: HttpClient) { }

  signup(cliente: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/clientes`, cliente);
  }

  login(credentials: any): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.baseUrl}/clientes/login`, {
      params: new HttpParams().set('email', credentials.email).set('password', credentials.password)
    });
  }

  checkUserExists(email: string): Observable<boolean | null> {
    return this.http.get<any[]>(`${this.baseUrl}/clientes/check`, {
      params: new HttpParams().set('email', email)
    }).pipe(
      map((response: any[]) => {
        if (response.length > 0) {
          return true;
        } else if (response.length == 0) {
          return false;
        }
        return null;
      }),
      catchError((error: any) => {
        return of(null); // If error occur, return false;
      })
    ) as Observable<boolean | null>; // Cast to boolean
  }
}