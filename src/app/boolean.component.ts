import { Component, Inject } from "@angular/core";
import { ComponentContainer } from "golden-layout";
import { BaseComponentDirective } from "ngx-golden-layout";

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

  constructor(
    @Inject(BaseComponentDirective.GoldenLayoutContainerInjectionToken)
    private container: ComponentContainer
  ) {
    console.log(this.container.title);
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
