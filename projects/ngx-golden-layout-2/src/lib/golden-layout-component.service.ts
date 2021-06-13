import {
  ComponentFactoryResolver,
  Injectable,
  Injector,
  StaticProvider,
} from "@angular/core";
import { ComponentContainer, JsonValue } from "golden-layout";
import { GoldenLayoutContainerInjectionToken } from "./injection-tokens";
import { GoldenLayoutManagerService } from "./golden-layout-manager.service";

@Injectable({
  providedIn: "root",
})
export class GoldenLayoutComponentService {
  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _goldenLayoutManagerService: GoldenLayoutManagerService
  ) {}

  /**
   * Creates a component in the GoldenLayout component.
   */
  createComponent(
    componentTypeJsonValue: JsonValue,
    container: ComponentContainer
  ) {
    const componentType = this._goldenLayoutManagerService
      .getRegisteredComponentsMap()
      .get(componentTypeJsonValue as string);

    if (componentType === undefined) {
      throw new Error(`Unknown component type of ${componentTypeJsonValue}`);
    } else {
      const provider: StaticProvider = {
        provide: GoldenLayoutContainerInjectionToken,
        useValue: container,
      };
      const injector = Injector.create({
        providers: [provider],
      });

      const componentFactoryRef = this._componentFactoryResolver.resolveComponentFactory<
        any
      >(componentType);
      return componentFactoryRef.create(injector);
    }
  }
}
