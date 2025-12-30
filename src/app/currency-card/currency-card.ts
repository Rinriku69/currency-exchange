import { Component, Input, signal } from '@angular/core';
import { DashBoard } from '../../model/dashboard';
import { DecimalPipe, NgClass } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { Currency } from '../../services/currency';
import { Logs } from '../../model/logs';

@Component({
  selector: 'app-currency-card',
  imports: [DecimalPipe, NgClass],
  templateUrl: './currency-card.html',
  styleUrl: './currency-card.scss',
})
export class CurrencyCard {
  @Input() currency!: DashBoard
  @Input() logs!: number[];
  myMath = Math

  log_isOpen = signal(false)

  logOpen() {
    this.log_isOpen.update(v => !v)
  }

  console() {
    console.log(this.log_isOpen())
  }
}
