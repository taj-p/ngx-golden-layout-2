import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { NgxGoldenLayoutModule } from "ngx-golden-layout";
import { GoldenLayoutManagerService } from "ngx-golden-layout";
import { AppComponent } from "./app.component";
import { BooleanComponent } from "./boolean.component";
import { ColorComponent } from "./color.component";
import { ControlsComponent } from "./controls.component";
import { TextComponent } from "./text.component";

@NgModule({
  declarations: [
    AppComponent,
    ControlsComponent,
    TextComponent,
    ColorComponent,
    BooleanComponent,
  ],
  imports: [BrowserModule, NgxGoldenLayoutModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private _goldenLayoutManagerService: GoldenLayoutManagerService) {
    this._goldenLayoutManagerService.registerComponentTypes([
      { name: TextComponent.name, componentType: TextComponent },
      { name: ColorComponent.name, componentType: ColorComponent },
      { name: BooleanComponent.name, componentType: BooleanComponent },
    ]);
  }
}
