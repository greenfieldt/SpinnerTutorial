import { Injectable } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { SpinnerComponent } from './spinner.component';

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

    constructor(private overlay: Overlay) {
    }

    spin() {
        console.log("Spinning!");
        //Call overlay.create and get back an overlay ref with
        //our configuration
        const _overlayRef = this.overlay.create(this.OverlaySpinnerConfig);
        //Then -- create a portal with our spinner component and attach
        //it to our overlay ref
        const spinnerPortal = new ComponentPortal(SpinnerComponent);
        //Finally we will return the ref so you can do a few important things
        //with it (like dispose it)
        _overlayRef.attach(spinnerPortal);
        return _overlayRef;
    }

    stop() {
        console.log("Stopping!");
    }

}
