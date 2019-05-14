import { Injectable, ComponentRef, Injector, InjectionToken } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';

export interface SpinnerConfig {
    defaultTimeOut?: number,
    color: string,
    mode: string,
    value?: number,
    diameter?: number,
    strokeWidth?: number

}

export const SpinnerDefaultConfig: SpinnerConfig = {
    defaultTimeOut: 6000,
    color: 'primary',
    mode: 'indeterminate',
    diameter: 70,
    strokeWidth: 7
};

export class SpinnerOverlayRef {

    constructor(private overlayRef: OverlayRef) { }

    close(): void {
        this.overlayRef.dispose();
    }
}

export interface SpinnerConfigWithOverlay {
    spinnerRef: SpinnerOverlayRef;
    config: SpinnerConfig;
}

export const SPINNER_DATA = new InjectionToken<SpinnerConfigWithOverlay>('SPINNER_DATA');
