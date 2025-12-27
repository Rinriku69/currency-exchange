import { Component, signal, Signal, inject, OnInit, OnDestroy, DestroyRef } from '@angular/core';
import { Currency } from '../../services/currency';
import { DashBoard } from '../../model/dashboard';
import { filter, Observable, Subject, takeUntil, timer } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CurrencyCard } from "../currency-card/currency-card";
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-dashboard',
  imports: [CurrencyCard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private currencyState = inject(Currency);
  dashboard: Signal<DashBoard[]> = toSignal(this.currencyState.CurrentCurrenciesWithTrend$,
    { initialValue: [] })
  private destroyed$ = new Subject<void>;
  private destroyRef = inject(DestroyRef);
  isPolling = signal(false);
  data = toSignal(this.currencyState.updates$);

  constructor() {
    this.currencyState.getDashboard()
  }

  LiveSwitch(isActive: boolean) {
    this.isPolling.set(isActive)
    this.currencyState.setPolling(isActive);
  }
}
