import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashBoard } from '../model/dashboard';

@Injectable({
  providedIn: 'root',
})
export class CurrencyApiService {
  private apiUrl = 'http://127.0.0.1:8000/api/currencies'
  
  constructor(private http: HttpClient) { }

  getCurrencies(): Observable<DashBoard[]> {
    return this.http.get<DashBoard[]>(this.apiUrl);
  }
}
