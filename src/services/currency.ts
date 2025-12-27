import { Injectable } from '@angular/core';
import { DashBoard } from '../model/dashboard';
import { BehaviorSubject, Observable, pairwise, map, switchMap, timer, EMPTY, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Currency {
  private CurrenciesState = new BehaviorSubject<DashBoard[]>([]);
  CurrentCurrencies$ = this.CurrenciesState.asObservable();
  CurrentCurrenciesWithTrend$ = this.CurrentCurrencies$.pipe(
    pairwise(),
    map(([prev, curr]): DashBoard[] => {
      return curr.map(CurrentCurrency => {
        const old = prev.find(OldCurrency => OldCurrency.currencyCode == CurrentCurrency.currencyCode);

        if (!old) {
          return { ...CurrentCurrency, trend: 'same' }
        }

        let trend: 'up' | 'down' | 'same' = 'same';
        if (CurrentCurrency.rate > old.rate) {
          trend = 'up';
        } else if (CurrentCurrency.rate < old.rate) {
          trend = 'down';
        }

        return {
          ...CurrentCurrency, trend: trend
        };
      })
    })
  );
  private pollingActive$ = new BehaviorSubject<boolean>(false);

  /* constructor() {
    this.pollingActive$.pipe(
      switchMap(isActive => isActive ? timer(0, 5000) : EMPTY)
    ).subscribe(() => {
      this.RandomRate();
    });
  } */

  updates$ = this.pollingActive$.pipe(
    switchMap(active => active ? timer(1000, 5000) : EMPTY),
    tap(() => this.RandomRate()) // Side effect: สั่งคำนวณเลข
  );

  setPolling(isActive: boolean) {
    this.pollingActive$.next(isActive);
  }

  private trendRNG() {
    return Math.round(Math.random())
  }

  private valueRNG() {
    return (Math.round(Math.random() * 100)) / 100
  }

  getDashboard() {
    if (this.CurrenciesState.value.length === 0) {
      this.CurrenciesState.next([{
        currencyCode: 'JPY',
        rate: 156.58
      }, {
        currencyCode: 'THB',
        rate: 31.07
      }])
    }
  }

  RandomRate() {
    const old_data = this.CurrenciesState.value;
    const new_data = old_data.map(currency => {
      const trend = this.trendRNG()
      const value = this.valueRNG()

      return {
        ...currency,
        rate: trend === 1 ? currency.rate + value
          : currency.rate - value
      }
    })

    this.CurrenciesState.next(new_data)
  }


}
