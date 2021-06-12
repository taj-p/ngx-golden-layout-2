import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { NgxGoldenLayoutModule } from "ngx-golden-layout";
import { AppComponent } from "./app.component";
import { BooleanComponent } from "./boolean.component";
import { ColorComponent } from "./color.component";
import { ControlsComponent } from "./controls.component";
import { GoldenLayoutHostComponent } from "./golden-layout-host.component";
import { TextComponent } from "./text.component";

@NgModule({
  declarations: [
    AppComponent,
    ControlsComponent,
    GoldenLayoutHostComponent,
    TextComponent,
    ColorComponent,
    BooleanComponent,
  ],
  imports: [BrowserModule, NgxGoldenLayoutModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
