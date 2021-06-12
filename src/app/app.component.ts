import { AfterViewInit, Component, OnDestroy, ViewChild } from "@angular/core";
import { ControlsComponent } from "./controls.component";
import { GoldenLayoutHostComponent } from "ngx-golden-layout";

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

  @ViewChild("controls") private _controlsComponent: ControlsComponent;
  @ViewChild("goldenLayoutHost")
  private _goldenLayoutHostComponent: GoldenLayoutHostComponent;

  ngAfterViewInit() {
    this._controlsComponent.setGoldenLayoutHostComponent(
      this._goldenLayoutHostComponent
    );
  }
}
