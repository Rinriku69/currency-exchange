import { Component, computed, effect, inject, Input, signal, Signal } from '@angular/core';
import { Currency } from '../../services/currency';
import { DashBoard } from '../../model/dashboard';
import { toSignal } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-converter',
  imports: [],
  templateUrl: './converter.html',
  styleUrl: './converter.scss',
})
export class Converter {
  myMath = Math;
  currencyState = inject(Currency);
  dashboard: Signal<DashBoard[]> = toSignal(this.currencyState.CurrentCurrencies$, { initialValue: [] })
  inputCode = this.dashboard().map(currnecy =>
    currnecy.currencyCode
  )
  inputUnit = signal('JPY')
  outputUnit = signal('USD')
  inputValue = signal(0)
  outputCode: Signal<string[]> = computed(() => {
    return this.inputCode
  })
  convertedValue = toSignal(this.currencyState.convertedValue$, { initialValue: 0 })
  outputValue = this.convertedValue() ? this.convertedValue : signal(0)
  constructor() {
    effect(() => {
      this.currencyState.toConvert$.next({ value: this.inputValue(), from: this.inputUnit(), to: this.outputUnit() })
    })

  }
  UnitChange(inputUnit: string, outputUnit: string) {
    this.inputUnit.set(inputUnit)
    this.outputUnit.set(outputUnit)

  }

  inputValueChange(value: number) {
    this.inputValue.set(Number.isNaN(value) ? 0 : value)
  }


}
