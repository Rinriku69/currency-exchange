import { Injectable } from '@angular/core';
import { DashBoard } from '../model/dashboard';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Currency {
  private CurrenciesState = new BehaviorSubject<DashBoard[]>([]);
  protected CurrentCurrencies$ = this.CurrenciesState.asObservable();




}
