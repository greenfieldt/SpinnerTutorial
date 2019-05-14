**Spinners had me wrapped around an axel** but I got free
=====================================
**Author:** *Timothy Greenfield*

**Date:** *5/13/19*

---

***Before we begin I feel compelled to tell you that I'm firmly against
clever titles, pictures, double entendres, and most especially puns.
I would never sink to such depths as they only cheapen the final
product, and we, as the technical community, should rise above such things.***


![Photo by www.localfitness.com.au](https://upload.wikimedia.org/wikipedia/commons/f/fa/Spin_Cycle_Indoor_Cycling_Class_at_a_Gym.JPG "Photo by www.localfitness.com.au")
## Spinners the Angular Way ##

**The Idea:**
Make a spinner that works as an Angular Service so we can
use it anywhere without spinning our wheels :] cut and pasting code.

To display the spinner outside of the workflow of any particular
screen we will utilize the Overlay Container though the use of a
Portal and pass data to our display component with at custom
InjectionToken.  And, finally for good hygiene, we will return a handle
to that structures the interactions the user code can have with our
display component.


*ezee mizee*



**The Tech:**

Angular Service

Angular CDK (Overlays and Portals)

Injection Tokens

Angular Material (MatProgressSpinner)

## Step 1 - Take care of of our CLI business ##
 
```shell
ng new SpinnerTutorial
cd SpinnerTutorial
ng g service spinner/spinner
ng g component spinner
npm install --save @angular/material @angular/cdk
```

I'm putting the spinner service in the src/app/spinner directory along
with the spinner component.  I think this makes sense in this case as
the two aspects of a single whole (i.e., you can't have one without
the other). 

Ok, I think that will take care the CLI for a while.

## Step 2 - Spin up our service (:joy: I'm dying here) ##

First things first: go to app.module.ts

- Add your spinner service to the providers array (and notice that it already
  has an Injectable decorator thanks to the CLI)
- Add an entryComponents key to the @NgModule hash and add Spinner
  Component to that
- Import MatProgressSpinnerModule and OvelayModule
  
It should look like this when you are done

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component`;
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
```


## Step 3 - Wait for it .... (ha ha ha, so good) ##
Make something to wait for so we can test our spinner. 

- Go to app.component.html and add the following

```html
<div style="text-align:center">
  <h1>
    Spinning our wheels
  </h1>

  <button  class='start-button' (click)='onStart()'> Go</button>

  <div class='stop-text hidden' #wait>
    <h1>Time Flies when you're having fun!</h1>
    <button class='reset-button' (click)='onReset()'>Reset</button>
  </div>

<router-outlet></router-outlet>
</div>
```

- Add the following to app.component.scss

```css
.start-button {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 36px;
  border-radius: 50%;
  height:250px;
  width:250px;
}

.reset-button {
  background-color: red;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 26px;
  height:100px;
  width:200px;
}

.stop-text {
    color:red;
    font-size:36px;
}

.hidden {
    visibility:hidden;
}
```

- Create a "spin" and "stop" method in spinner service

```typescript
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
```

- Inject our service into app component
- Implement the onStart method


```typescript
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { SpinnerService } from './spinner/spinner.service';
import { timer } from 'rxjs';
import { tap, take } from 'rxjs/operators'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    @ViewChild('wait') wait: ElementRef;

    constructor(private spinner: SpinnerService) { }

    ngOnInit() { }

    onStart() {
        this.spinner.spin();
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
    }

    onReset() {
        this.wait.nativeElement.classList.toggle('hidden');
    }
}
```

## Step 4 - Spin up 😏 the overlay ##

We are getting down to business now.  Let's review our goals for step 4.
 + Display a MatProgressSpinner as an overlay
 + Pass it configuration data using InjectTokens
 
 - Add a MatProgressSpinner in spinner.component.[ts|htmlcss]
 
 
 We are going to add the default MatProgressSpinner to our spinner
 component.  This one is taken right out of [Angular
 Material](https://material.angular.io/components/progress-spinner/examples
 "Angular Material MatProgressSpinner") but you could use straight css
 too... perhaps look to [SpinKit](https://tobiasahlin.com/spinkit/
 "SpinKit") for inspiration.
 
 spiner.component.ts
 ```typescript
 import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
    color = 'primary';
    mode = 'determinate';
    value = 50;
    diameter = 50;
    strokeWidth = 10;
    
  constructor() { }

  ngOnInit() {
  }

}
```
spinner.component.html

```html
<mat-progress-spinner
  class="spinner-margin"
  [color]="color"
  [mode]="mode"
  [value]="value"
  [diameter]="diameter"
  [strokeWidth]="strokeWidth">
</mat-progress-spinner>
```

spinner.component.scss
```css
.spinner-margin {
  margin: 0 10px;
}
```

- Now let's deal with the
  [CDK](https://material.angular.io/cdk/categories "CDK"),  The
  Angular CDK guys say

    >   The Component Dev Kit (CDK) is a set of tools that implement
    >   common interaction patterns whilst being unopinionated about their
    >   presentation. It represents an abstraction of the core
    >   functionalities found in the Angular Material library, without any
    >   styling specific to Material Design. Think of the CDK as a blank
    >   state of well-tested functionality upon which you can develop your
    >   own bespoke components.
  
So the CDK is a toolbox we can use to make whatever we want to
make. The tool we need is the Overlay.  This particular tool needs
some css styling so you need to either 1.) Use Material Design or 2.)
@import the css yourself into your src/styles.scss.
 
  * We are using Angular Material so we don't need to `@import
 '~@angular/cdk/overlay-prebuilt.css';` *

### Overlays need an OverlayConfig that defines backdrop, panel, position strategy and scroll strategy. ###

 We want our spinner to show up
 in the center of the page (position strategy), make the entire page a
 little darker (backdrop), and
 block scrolling (scrolling strategy).

spinner.service.ts
 ```typescript
     OverlaySpinnerConfig = {
        hasBackdrop: true,
        backdropClass: 'dark-backdrop',
        panelClass: '',
        scrollStrategy: this.overlay.scrollStrategies.block(),
        positionStrategy: this.overlay.position()
            .global().centerHorizontally().centerVertically()
    };
 ```

We can define the dark-back drop in our global scss 
 
src/styles.scss (add the dark-back-drop styles)
```css
.cdk-overlay-backdrop.cdk-overlay-backdrop-showing {
  &.dark-backdrop {
    background: #000;
    opacity: 0.65 !important;
  }
}
```

Overlays have content injected into them by Portals. In the next code
snippet we are going to create our Overlay using the config then make
a ComponentPortal with the thing we want to display (SpinnerComponent)
and attach it to the overlay (easier done than said)


spinner.service.ts
 ```typescript
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
```
 
 
After all that work lets run the code and see our spinner.  Drum roll
please, dum de dum dum... click the green button and ... nothing happened????

### Let's take a quick sidetrack on what overlays really do and how to debug them ###

Open your console in your web browser and go to the element
inspector.  Towards the bottom of your html look for a div element
with the class cdk-overlay-container.

You will find this right after your scripts in your
element explorer.  Here is what mine says: 
```html
<div class="cdk-overlay-container">
  <div class="cdk-overlay-backdrop dark-backdrop
	      cdk-overlay-backdrop-showing">
  </div>
  <div class="cdk-global-overlay-wrapper" dir="ltr"
       style="justify-content: center; align-items: center;">
    <div id="cdk-overlay-0" class="cdk-overlay-pane"
	 style="pointer-events: auto; position: static;">
      <app-spinner _nghost-ufn-c1="">
	<mat-progress-spinner _ngcontent-ufn-c1="" class="spinner-margin
							  mat-progress-spinner mat-primary
							  mat-progress-spinner-indeterminate-animation" role="progressbar"
			      ng-reflect-color="primary" ng-reflect-diameter="50"
			      ng-reflect-stroke-width="10" ng-reflect-mode="determinate"
			      ng-reflect-value="50" aria-valuemin="0" aria-valuemax="100"
			      aria-valuenow="50" mode="determinate" style="width: 50px; height:
									   50px;">
	  <svg focusable="false" preserveAspectRatio="xMidYMid meet"
	       ng-reflect-ng-switch="false" viewBox="0 0 50 50" style="width: 50px;
								       height: 50px;">
	    <!--bindings={
		"ng-reflect-ng-switch-case": "true"
		}-->
	    <!--bindings={
		"ng-reflect-ng-switch-case": "false"
		}-->
	    <circle cx="50%" cy="50%" r="20" style="stroke-dashoffset:
						    62.8319px; stroke-dasharray: 125.664px; stroke-width:
						    20%;">
	    </circle>
	  </svg>
	</mat-progress-spinner>
      </app-spinner>
    </div>
  </div>
</div>
```
Some things to note:

you can see there is a 
- a div element with a cdk-overlay-backdrop class and our custom
  back-drop class (dark-backdrop)
- a div element with a cdk-global-overlay-wrapper class
that seems to be respecting our positioning strategy (global and
centered)
- a div element with class cdk-overlay-0 which has our app-spinner tag
  in it
  
So that is all basically good news.  We seem to have created the
overlay we meant to create, and yet no spinner.  In this case the
problem doesn't seem to be with the overlay at all.  Most of you have
already spotted the error message in console that we've been
ignoring.  

The problem in this case is Material Design is a theme based framework
and it can't really do much until you tell it what theme to use.  If
you did a default install the standard themes are included in a directory called
node_modules/@angular/material/prebuilt-themes.  You need to pick one
of these and import it into your global scss.
  
  styles.scss
  ```
  @import '@angular/material/prebuilt-themes/deeppurple-amber.css';
```

Try to click the green button again and now we have our spinner (it
still isn't very exciting because it is just a half circle not doing
anything but hey...baby steps)

## Step 5 - Spin-ding 👊🏼 some quality time with our component ##
We are almost there! one tricky bit left.  Somehow we need to communicate with
our spinner.component.ts so we can pass it configuration information.
The way this is accomplished is through the use of a custom InjectionToken.

### Make a new file called spinner.config.ts ###

 We need to put all of our spinner config structures in here as well
  as anything that both the spinner service and the spinner component
  are going to need so we don't cause circular dependencies.
  
  spinner.config.ts
  ```typescript
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
```

- The SpinnerConfig interface comes right from the customizable
  apsects of the MatProgressSpinner.
- The SpinnerDefaultConfig is a convienience structure with some good
  defaults to make life easier.
- The SpinnerOverlayRef is a container class that hides the "real"
  overlayRef and controls what access we give to the users of the
  service.
  
  From the Angular guys:

    > Use an InjectionToken whenever the type you are injecting is not reified (does not have a runtime representation) such as when injecting an interface, callable type, array or parameterized type.

Just a sec,  let me look up reified, 

> Making something abstract more concrete or real

What do you know we've been reifing all this time and we didn't know
it, but let's not digress.
  
- The SPINNER_DATA constant is our InjectionToken definition we've
  used the simplest InjectionToken with just a type and a desc.  If
  needed you can pass in optional parameters to define a "providedIn"
  and Factory to create it (similar @Injectable)
  
### Update Spinner.Service.ts ###
With these new types we need to finish off our Spinner.Service
class by modifying it to expect a config parameter, create the
injection token, and return SpinnerOverlayRef instead of the
OverlayRef.

```typescript
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
```

Notes:
- A portal injector is a custom injector used when providing custom
  injection tokens to components inside a portal (relevant no?)
  
  

### Update App.Component.ts  ###
Update the App.Component.ts to use our SpinnerDefaultConfig and pass
it to spinner.service.  We've left ourselves three ways of stopping
the spinner, passing a timeout, using the SpinnerOverlayRef, or
calling the spinner service stop method.

```typescript
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
```

### Last but not least update spinner.component ###
After all that work we finally have the config data being passed to
our app component and all we need to do now is use it!

```typescript
import { Component, OnInit, Inject } from '@angular/core';
import { SPINNER_DATA, SpinnerConfig, SpinnerOverlayRef } from './spinner.config';
import { timer } from 'rxjs';
import { tap, take } from 'rxjs/operators';

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
    color = 'primary';
    mode = 'determinate';
    value = 50;
    diameter = 50;
    strokeWidth = 10;

    constructor(
        @Inject(SPINNER_DATA) public spinnerRef: SpinnerOverlayRef,
        @Inject(SPINNER_DATA) public config: SpinnerConfig) {

        console.log(config);

        if (config.defaultTimeOut) {
            this.setTimeOut(config.defaultTimeOut);
        }

        this.mode = config.mode
        this.color = config.color;

        if (config.value) {
            this.value = config.value;
        }

        if (config.diameter) {
            this.diameter = config.diameter;
        }

        if (config.strokeWidth) {
            this.strokeWidth = config.strokeWidth;
        }

    }

    ngOnInit() {
    }

    setTimeOut(timeout: number) {
        timer(timeout).pipe(
            tap(_ => this.spinnerRef.close()),
            take(1),
        ).subscribe();
    }

}
```

Notes :
Just a reminder from the Angular docs: An 'Inject decorator' is:

> A parameter decorator on a dependency parameter of a class constructor that specifies a custom provider of the dependency.

Do you see the circle of life ?


in spinner.config we defined
```typescript
export interface SpinnerConfigWithOverlay {
    spinnerRef: SpinnerOverlayRef;
    config: SpinnerConfig;
}

export const SPINNER_DATA = new InjectionToken<SpinnerConfigWithOverlay>('SPINNER_DATA');
```


in spiner.service.ts we set
```typescript
        //add this parameter so we can close the spinner
        injectionTokens.set(SpinnerOverlayRef, spinnerRef);
        //add this one to pass the config data
        injectionTokens.set(SPINNER_DATA, config);
```

and in spinner.component.ts it pops back out

```typescript
    constructor(
        @Inject(SPINNER_DATA) public spinnerRef: SpinnerOverlayRef,
        @Inject(SPINNER_DATA) public config: SpinnerConfig) {
```

## I put the best spin 🤦 on this I could ##
Using the CDK + Injection is a powerful tool and I'm out of puns.
