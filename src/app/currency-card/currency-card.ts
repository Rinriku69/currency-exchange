import { Component, Input } from '@angular/core';
import { DashBoard } from '../../model/dashboard';

@Component({
  selector: 'app-currency-card',
  imports: [],
  templateUrl: './currency-card.html',
  styleUrl: './currency-card.scss',
})
export class CurrencyCard {
  @Input() currency!: DashBoard
}
