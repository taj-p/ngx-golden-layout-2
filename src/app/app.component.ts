import { AfterViewInit, Component, ViewChild } from "@angular/core";
import {
  GoldenLayoutHostComponent,
  GoldenLayoutManagerService,
} from "ngx-golden-layout";

@Component({
  selector: "app-root",
  template: `
      <app-controls #controls></app-controls>
      <golden-layout-host #goldenLayoutHost></golden-layout-host>   
  `,
  styles: [
    `
      :host {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: row;
      }
    `,
  ],
})
export class AppComponent implements AfterViewInit {
  title = "golden-layout-ng-app";

  @ViewChild("goldenLayoutHost")
  private _goldenLayoutHostComponent: GoldenLayoutHostComponent;

  constructor(
    private _goldenLayoutManagerService: GoldenLayoutManagerService
  ) {}

  ngAfterViewInit() {
    this._goldenLayoutManagerService.setGoldenLayoutHostComponent(
      this._goldenLayoutHostComponent
    );
  }
}
