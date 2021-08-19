# NgxGoldenLayout2

This library allows for Angular 12+ applications to easily use [Golden Layout](http://golden-layout.com/) version 2.This project is a short term solution to allow the use of Golden Layout 2 in Angular 12 (without needing to ignore peer dependencies), until the [official package](https://github.com/EmbeddedEnterprises/ng6-golden-layout) supports it.

## Demo

To see this package in action, run:

```
npm i && npm start
```

## Setup

1. Install this package

```
npm i ngx-golden-layout-2 golden-layout
```

2. Add NgxGoldenLayout to your app module

```ts
@NgModule({
  declarations: [...],
  imports: [NgxGoldenLayoutModule.forRoot()], // Add this line
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  ...
}
```

3. Register all your Ng components with NgxGoldenLayoutModule in AppModule.

```ts

import {
  NgxGoldenLayoutModule,
  GoldenLayoutManagerService,
} from "ngx-golden-layout-2";

@NgModule({
  ... 
  imports: [NgxGoldenLayoutModule.forRoot()],
  ...
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
```

4. To your AppComponent (or the component you wish to use GoldenLayout in) set the host component:

```ts
import {
  GoldenLayoutHostComponent,
  GoldenLayoutManagerService,
} from "ngx-golden-layout-2";

@Component({
  template: `
      <golden-layout-host #goldenLayoutHost></golden-layout-host>   
  `,
})
export class AppComponent implements AfterViewInit {
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
```

5. Add your components to the GoldenLayout host via...

```ts

    this._goldenLayoutManagerService.addComponent(componentType);
```

