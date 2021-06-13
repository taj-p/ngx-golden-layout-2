import { Injectable, Type } from "@angular/core";
import { GoldenLayoutHostComponent } from "./golden-layout-host.component";
import { GoldenLayout } from "golden-layout";

export type ngComponentInstance = any;

@Injectable({
  providedIn: "root",
})
export class GoldenLayoutManagerService {
  private _goldenLayoutHostComponent: GoldenLayoutHostComponent;
  private _goldenLayout: GoldenLayout;
  private _componentTypeMap = new Map<string, Type<any>>();

  setGoldenLayoutHostComponent(value: GoldenLayoutHostComponent) {
    this._goldenLayoutHostComponent = value;
    this._goldenLayout = this._goldenLayoutHostComponent.goldenLayout;
  }

  /**
   * Register a component with Golden Layout.
   */
  registerComponentType(name: string, componentType: Type<any>) {
    this._componentTypeMap.set(name, componentType);
  }

  /**
   * Register a list of components with Golden Layout.
   */
  registerComponentTypes(
    components: { name: string; componentType: Type<any> }[]
  ) {
    for (const component of components) {
      this.registerComponentType(component.name, component.componentType);
    }
  }

  /**
   * Returns a list of all the registered component type names.
   */
  getRegisteredComponentTypeNames(): string[] {
    return [...this._componentTypeMap.keys()];
  }

  /**
   * Returns the map of all registered component types.
   */
  getRegisteredComponentsMap() {
    // Return a clone.
    return new Map<string, Type<any>>(this._componentTypeMap);
  }

  /**
   * Gets `GoldenLayout`.
   */
  get goldenLayout(): GoldenLayout {
    if (!this._goldenLayout) {
      throw new Error("GoldenLayoutHostComponent not yet set.");
    }

    return this._goldenLayout;
  }

  /**
   * Gets the Golden Layout's host component.
   */
  get goldenLayoutHostComponent(): GoldenLayoutHostComponent {
    if (!this._goldenLayoutHostComponent) {
      throw new Error("GoldenLayoutHostComponent not yet set.");
    }

    return this._goldenLayoutHostComponent;
  }

  /**
   * Adds a component to the `GoldenLayoutHostComponent` and returns
   * the Angular instance of the component.
   *
   * @example
   * ```
   *    const textComponent = this._goldenLayoutManagerService
   *      .addComponent(TextComponent.name) as TextComponent;
   *
   *    textComponent.accessPublicMethod(withArgs);
   * ```
   */
  addComponent(componentType: string): ngComponentInstance {
    if (!this._goldenLayout) {
      throw new Error("GoldenLayoutHostComponent not yet set.");
    }

    const component = this._goldenLayout.newComponent(componentType);
    const componentRef = this._goldenLayoutHostComponent.getComponentRef(
      component.container
    );

    if (!componentRef) {
      throw new Error("Unexpected error when getting componentRef");
    }

    return componentRef.instance;
  }
}
