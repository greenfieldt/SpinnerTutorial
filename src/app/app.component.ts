import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { SpinnerService } from './spinner/spinner.service';
import { timer } from 'rxjs';
import { tap, take } from 'rxjs/operators'
import { SpinnerOverlayRef, SpinnerDefaultConfig } from './spinner/spinner.config';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    @ViewChild('wait') wait: ElementRef;

    constructor(private spinner: SpinnerService) { }

    ngOnInit() { }

    spinerControl: SpinnerOverlayRef;

    onStart() {
        let config = SpinnerDefaultConfig;
        //let it spin until we tell it to stop
        config.defaultTimeOut = undefined;

        this.spinerControl = this.spinner.spin(config);
        timer(5000).pipe(
            tap(_ => {
                this.onStop();
            }),
            take(1)
        ).subscribe();

    }

    onStop() {
        this.wait.nativeElement.classList.toggle('hidden');
        this.spinner.stop();
        //or we could use
        //this.spinerControl.close();
    }

    onReset() {
        this.wait.nativeElement.classList.toggle('hidden');
    }
}
