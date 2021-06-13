import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import { DragSource,
  GoldenLayout,
  LayoutConfig,
  ResolvedLayoutConfig
} from "golden-layout";
import {GoldenLayoutHostComponent, GoldenLayoutManagerService} from 'ngx-golden-layout-2';
import {ColorComponent} from "./color.component";
import {predefinedLayoutNames, predefinedLayouts} from './predefined-layouts';
import {TextComponent} from './text.component';

@Component({
  selector: 'app-controls',
  template: `
    <section id="addComponentSection">
      <select #registeredComponentTypeSelect
        id="registeredComponentTypeSelect"
        class="control"
        [value]="initialRegisteredComponentTypeName"
        (change)="handleRegisteredComponentTypeSelectChange(registeredComponentTypeSelect.value)"
      >
        <option *ngFor="let name of registeredComponentTypeNames">{{name}}</option>
      </select>
      <button #addComponentButton id="addComponentButton" class="control" (click)="handleAddComponentButtonClick()">Add Component</button>
    </section>
    <section id="addTextComponentSection">
      <input #componentTextInput id="componentTextInput"
        class="control"
        size="8"
        [value]="initialComponentTextValue"
        (input)="handleComponentTextInputInput(componentTextInput.value)"
      />
      <button #addTextComponentButton
        id="addTextComponentButton"
        class="control"
        (click)="handleAddTextComponentButtonClick()"
      >Add Text Component</button>
    </section>
    <section id="predefinedLayoutsSection">
      <select #layoutSelect
        id="layoutSelect"
        class="control"
        [value]="initialLayoutName"
        (change)="handleLayoutSelectChange(layoutSelect.value)"
      >
        <option *ngFor="let name of layoutNames">{{name}}</option>
      </select>
      <button #loadLayoutButton id="loadLayoutButton" class="control" (click)="handleLoadLayoutButtonClick()">Load Layout</button>
    </section>
    <section id="saveAndReloadLayoutSection">
      <button #saveLayoutButton id="saveLayoutButton" class="control" (click)="handleSaveLayoutButtonClick()">Save Layout</button>
      <button #reloadSavedLayoutButton
        id="reloadSavedLayoutButton"
        class="control"
        [disabled]="saveLayoutButtonDisabled === true ? true : null"
        (click)="handleReloadSavedLayoutClick()"
      >Reload saved Layout</button>
    </section>
    <section id="dragSection">
      <button class="draggable control" #dragMe>Drag me !</button>
    </section>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
    }

    .control {
      margin: 2px;
    }
.draggable { cursor: move;
    }

    #addComponentSection {
      display: flex;
      flex-direction: row;
    }

    #addTextComponentSection {
      display: flex;
      flex-direction: row;
    }

    #predefinedLayoutsSection {
      display: flex;
      flex-direction: row;
    }

    #saveAndReloadLayoutSection {
      display: flex;
      flex-direction: row;
    }

    #dragSection {
      display: flex;
      flex-direction: column;
    }
  `
  ]
})
export class ControlsComponent implements AfterViewInit, OnDestroy {
  private _savedLayout: ResolvedLayoutConfig | undefined;

  private _selectedRegisteredComponentTypeName: string;
  private _componentTextValue: string;
  private _selectedLayoutName: string;
  private _dragSources: Array<DragSource | undefined> = [];

  @ViewChild('dragMe') private dragMeElementRef?: ElementRef;

  public registeredComponentTypeNames: readonly string[];
  public initialRegisteredComponentTypeName: string;
  public initialComponentTextValue = 'Water';
  public layoutNames: readonly string[];
  public initialLayoutName: string;
  public saveLayoutButtonDisabled = true;

  get element() {
    return this._elRef.nativeElement;
  }

  constructor(private _elRef: ElementRef<HTMLElement>,
              private _goldenLayoutManagerService: GoldenLayoutManagerService
  ) {
  }

  ngAfterViewInit() {
    setTimeout(() => this.initialiseControls(), 0);
  }

  ngOnDestroy() {
    for (const dragSource of this._dragSources) {
      if (dragSource) {
        this._goldenLayoutManagerService.goldenLayout.removeDragSource(dragSource);
      }
    }
  }

  handleRegisteredComponentTypeSelectChange(value: string) {
    this._selectedRegisteredComponentTypeName = value;
  }

  handleComponentTextInputInput(value: string) {
    this._componentTextValue = value;
  }

  handleAddComponentButtonClick() {
    const componentType = this._selectedRegisteredComponentTypeName;
    this._goldenLayoutManagerService.addComponent(componentType);
  }

  handleAddTextComponentButtonClick() {
    // this demonstrates how to access created Angular component
    const textComponent = this._goldenLayoutManagerService.addComponent(TextComponent.name) as TextComponent;
      textComponent.setInitialValue(this._componentTextValue);
  }

  handleLayoutSelectChange(value: string) {
    this._selectedLayoutName = value;
  }

  handleLoadLayoutButtonClick() {
    const selectedLayout = predefinedLayouts.find((layout) => layout.name === this._selectedLayoutName);
    if (selectedLayout === undefined) {
      throw new Error('handleLoadLayoutButtonClick Error');
    } else {
      this._goldenLayoutManagerService.goldenLayout.loadLayout(selectedLayout.config);
    }
  }

  handleSaveLayoutButtonClick() {
    this._savedLayout = this._goldenLayoutManagerService.goldenLayout.saveLayout();
    this.saveLayoutButtonDisabled = false;
  }

  handleReloadSavedLayoutClick() {
    if (this._savedLayout === undefined) {
      throw new Error('No saved layout');
    } else {
      const layoutConfig = LayoutConfig.fromResolved(this._savedLayout);
      this._goldenLayoutManagerService.goldenLayout.loadLayout(layoutConfig);
    }
  }

  private initialiseControls() {
    this.registeredComponentTypeNames = this._goldenLayoutManagerService.getRegisteredComponentTypeNames();
    this._selectedRegisteredComponentTypeName = this.registeredComponentTypeNames[0]
    this.initialRegisteredComponentTypeName = this._selectedRegisteredComponentTypeName;
    this._componentTextValue = this.initialComponentTextValue;
    this.layoutNames = predefinedLayoutNames;
    this._selectedLayoutName = this.layoutNames[0]
    this.initialLayoutName = this._selectedLayoutName;

    this.initialiseDragSources();
  }

  private initialiseDragSources() {
    this.loadDragSource('Drag me !', ColorComponent.name, this.dragMeElementRef);
  }

  private loadDragSource(title: string, componentName: string, element: ElementRef | undefined): void {
    const config = () => {
      const item: DragSource.ComponentItemConfig = {
        state: undefined,
        title,
        type: componentName,
      };
      return item;
    };
    this._dragSources.push(this._goldenLayoutManagerService.goldenLayout.newDragSource(element?.nativeElement, config));
  }
}
