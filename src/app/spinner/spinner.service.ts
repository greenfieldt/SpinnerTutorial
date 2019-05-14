import { Injectable, ComponentRef, Injector } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { SpinnerComponent } from './spinner.component';
import { SpinnerOverlayRef, SpinnerConfig, SPINNER_DATA } from './spinner.config';

@Injectable({
    providedIn: 'root'
})
export class SpinnerService {

    OverlaySpinnerConfig = {
        hasBackdrop: true,
        backdropClass: 'dark-backdrop',
        panelClass: '',
        scrollStrategy: this.overlay.scrollStrategies.block(),
        positionStrategy: this.overlay.position()
            .global().centerHorizontally().centerVertically()
    };

    constructor(private injector: Injector, private overlay: Overlay) {
    }

    _overlayRef: OverlayRef;

    spin(config: SpinnerConfig) {
        console.log("Spinning!");
        //Call overlay.create and get back an overlay ref with
        //our configuration
        this._overlayRef = this.overlay.create(this.OverlaySpinnerConfig);

        const overlayRef = new SpinnerOverlayRef(this._overlayRef);

        //We are going to make new injectiontoken with our spinner configuration
        //data
        const injector = this.createInjector(config, overlayRef);

        //Then -- create a portal with our spinner component and attach
        //it to our overlay ref 
        const spinnerPortal = new ComponentPortal(SpinnerComponent, null, injector);

        //Attach the Portal "holding" the Spinnercomponent to the OverlayRef
        const containerRef: ComponentRef<SpinnerComponent> =
            this._overlayRef.attach(spinnerPortal);

        //Now we are returning the SpinnerComponentRef (instead of the OverlayRef)
        return overlayRef;

    }

    private createInjector(config: SpinnerConfig, spinnerRef: SpinnerOverlayRef)
        : PortalInjector {
        const injectionTokens = new WeakMap();

        //add this parameter so we can close the spinner
        injectionTokens.set(SpinnerOverlayRef, spinnerRef);
        //add this one to pass the config data
        injectionTokens.set(SPINNER_DATA, config);

        return new PortalInjector(this.injector, injectionTokens);
    }

    stop() {
        console.log("Stopping!");
        this._overlayRef.dispose();
    }

}
