import { Component, signal, Signal, inject, OnInit, OnDestroy, DestroyRef } from '@angular/core';
import { Currency } from '../../services/currency';
import { DashBoard } from '../../model/dashboard';
import { filter, Observable, Subject, takeUntil, timer } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CurrencyCard } from "../currency-card/currency-card";
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-dashboard',
  imports: [AsyncPipe, CurrencyCard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit, OnDestroy {
  private currencyState = inject(Currency);
  dashboard: Signal<DashBoard[]> = toSignal(this.currencyState.CurrentCurrenciesWithTrend$,
    { initialValue: [] })
  private destroyed$ = new Subject<void>;
  private destroyRef = inject(DestroyRef);
  isPolling = signal(false);

  constructor() {
    this.currencyState.getDashboard()
  }

  ngOnInit(): void {
    timer(0, 5000).pipe(
      takeUntil(this.destroyed$),
      filter(() => this.isPolling())
    ).subscribe(() =>
      this.currencyState.RandomRate())
  }

  ngOnDestroy(): void {
    console.log('Dashboard destroyed');
    this.destroyed$.next()
    this.destroyed$.complete()
  }

  LiveSwitch(bool: boolean) {
    this.isPolling = signal(bool)
  }
}
