import { Injectable } from '@angular/core';
import { DashBoard } from '../model/dashboard';
import { BehaviorSubject, Observable, pairwise, map, switchMap, timer, EMPTY, tap, filter, of, combineLatest } from 'rxjs';

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
  toConvert$ = new BehaviorSubject<{ value: number, from: string, to: string }>({ value: 1, from: 'JPY', to: 'USD' })

  convertedValue$ = combineLatest([this.CurrentCurrencies$,
  this.toConvert$
  ]).pipe(map(([currentCurr, toCon]) => {
    const inputValue = toCon.value

    const fromRate = toCon.from === 'JPY'
      ? currentCurr.find(curr => {
        return curr.currencyCode === 'JPY'
      })?.rate
      : currentCurr.find(curr => {
        return curr.currencyCode === toCon.from
      })?.rate;

    const toRate = toCon.to === 'USD'
      ? 1
      : currentCurr.find(curr => { return curr.currencyCode === toCon.to })?.rate;

    if (fromRate == null || toRate == null) {
      return 0;
    }

    return (inputValue / fromRate) * toRate

  }))
  /* constructor() {
    this.pollingActive$.pipe(
      switchMap(isActive => isActive ? timer(0, 5000) : EMPTY)
    ).subscribe(() => {
      this.RandomRate();
    });
  } */

  updates$ = this.pollingActive$.pipe(
    switchMap(active => active ? timer(1000, 5000) : EMPTY),
    tap(() => this.RandomRate())
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
      }, {
        currencyCode: 'EUR',
        rate: 0.85
      }, {
        currencyCode: 'CNY',
        rate: 7.03
      }, {
        currencyCode: 'KRW',
        rate: 1442.33
      }, {
        currencyCode: 'SGD',
        rate: 1.28
      }, {
        currencyCode: 'USD',
        rate: 1
      }])
    }
  }

  RandomRate() {
    const old_data = this.CurrenciesState.value;
    const new_data = old_data.
      map(currency => {
        const trend = this.trendRNG()
        const value = this.valueRNG()
        console.log(trend)
        if (currency.currencyCode == 'USD') {
          return currency
        }

        return {
          ...currency,
          rate: (trend === 0) && !(currency.rate - value < 0) ? currency.rate - value
            : currency.rate + value
        }
      })

    this.CurrenciesState.next(new_data)
  }




}
