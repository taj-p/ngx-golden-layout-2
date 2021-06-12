import { Component } from "@angular/core";

@Component({
  selector: "app-boolean-component",
  template: `
    <input #input id="input" type="checkbox" [checked]="initialValue" (input)="updateValue(input.checked)">
  `,
  styles: [`#input { display: block; }`],
})
export class BooleanComponent {
  private value: boolean;
  public initialValue: boolean;

  constructor() {
    const state = true;
    this.value = state as boolean;
    this.initialValue = this.value;
  }

  updateValue(value: boolean) {
    this.value = value;
  }

  handleContainerStateRequestEvent(): boolean {
    return this.value;
  }
}
