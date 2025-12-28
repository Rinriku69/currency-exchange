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
  currencyState = inject(Currency)
  dashboard: Signal<DashBoard[]> = toSignal(this.currencyState.CurrentCurrencies$, { initialValue: [] })
  inputCode = this.dashboard().map(currnecy =>
    currnecy.currencyCode
  )
  inputUnit = signal('JPY')
  outputUnit = signal('THB')
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
  inputUnitChange(unit: string) {
    this.inputUnit.set(unit)

  }
  outputUnitChange(unit: string) {
    this.outputUnit.set(unit)
  }
  inputValueChange(value: number) {
    this.inputValue.set(Number.isNaN(value) ? 0 : value)
    console.log(this.outputValue())
  }


}
