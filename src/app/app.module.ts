import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerService } from './spinner/spinner.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
    declarations: [
        AppComponent,
        SpinnerComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatProgressSpinnerModule,
        OverlayModule
    ],
    entryComponents: [SpinnerComponent],
    providers: [SpinnerService],
    bootstrap: [AppComponent]
})
export class AppModule { }
