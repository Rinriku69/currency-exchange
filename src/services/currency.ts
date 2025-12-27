import { Injectable } from '@angular/core';
import { DashBoard } from '../model/dashboard';
import { BehaviorSubject, Observable, pairwise, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Currency {
  private CurrenciesState = new BehaviorSubject<DashBoard[]>([]);
  CurrentCurrencies$ = this.CurrenciesState.asObservable();
  /* CurrentCurrenciesWithTrend$ = this.CurrentCurrencies$.pipe(
    pairwise(),
    map(([prev, curr]) => {
      return curr.map(currency => {
        const old = prev.find(p => p.currencyCode === currency.currencyCode);

        if (!old) {
          return { ...currency, trend: 'same' };
        }

        let trend: 'up' | 'down' | 'same' = 'same';

        if (currency.rate > old.rate) trend = 'up';
        else if (currency.rate < old.rate) trend = 'down';

        return {
          ...currency,
          trend
        };
      });
    })
  ); */

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
  )

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
