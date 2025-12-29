import { Component, Input } from '@angular/core';
import { DashBoard } from '../../model/dashboard';
import { DecimalPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-currency-card',
  imports: [DecimalPipe, NgClass],
  templateUrl: './currency-card.html',
  styleUrl: './currency-card.scss',
})
export class CurrencyCard {
  @Input() currency!: DashBoard
  myMath = Math
}
