import { ModuleWithProviders, NgModule } from "@angular/core";
import { GoldenLayoutComponentService } from "./golden-layout-component.service";
import { GoldenLayoutHostComponent } from "./golden-layout-host.component";

@NgModule({
  declarations: [GoldenLayoutHostComponent],
  providers: [GoldenLayoutComponentService],
  imports: [],
  exports: [GoldenLayoutHostComponent],
})
export class NgxGoldenLayoutModule {
  static forRoot(): ModuleWithProviders<NgxGoldenLayoutModule> {
    return {
      ngModule: NgxGoldenLayoutModule,
      providers: [GoldenLayoutComponentService],
    };
  }
}
