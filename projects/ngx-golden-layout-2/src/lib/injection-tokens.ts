import { InjectionToken } from "@angular/core";
import { ComponentContainer } from "golden-layout";

export const GoldenLayoutContainerTokenName = "GoldenLayoutContainer";
export const GoldenLayoutContainerInjectionToken = new InjectionToken<
  ComponentContainer
>(GoldenLayoutContainerTokenName);
