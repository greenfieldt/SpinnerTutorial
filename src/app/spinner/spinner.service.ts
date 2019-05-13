import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SpinnerService {

    constructor() {
    }

    spin() {
        console.log("Spinning!");
    }

    stop() {
        console.log("Stopping!");
    }

}
