**Spinners had me wrapped around an axel** but I got free
=====================================
**Author:** *Timothy Greenfield*

**Date:** *5/13/19*

---

***Before we begin I feel compelled to tell you that I'm having a small
crisis at the moment.  I really don't see the need for puns or clever
titles in technical blogs (ditto for the clever top picture). But,
some times I just can't help myself.  Anyways I don't want this soul
searching to spin out of control so let's get going...***


![Photo by www.localfitness.com.au](https://upload.wikimedia.org/wikipedia/commons/f/fa/Spin_Cycle_Indoor_Cycling_Class_at_a_Gym.JPG "Photo by www.localfitness.com.au")
## Spinners the Angular Way ##

**The Idea:**
Make a spinner that works as an Angular Service so we can
use it anywhere without spinning our wheels cut and pasting code.

We can use the MatProgressSpinner in a custom overlay to present the
spinner.  Invoke it from anywhere using DI by making a service to
instantiate it, and pass data across the ether using Injection Tokens.

*ezee mizee*



**The Tech:**

Angular Service

Angular CDK - Overlays

Injection Tokens

MatProgressSpinner

## Step 1 - Take care of of our CLI business ##
 
```shell
ng new SpinnerTutorial --routing
cd SpinnerTutorial
ng g service spinner/spinner
ng g component spinner
npm install --save @angular/material @angular/cdk @angular/animations
```

I'm putting the spinner service in the src/app/spinner directory
because this is just a sample project.  On bigger efforts I would move
this to the shared portion of the code because, well, sharing is kind
of the point 



Ok, I think that will take care the CLI for a while

## Step 2 - Spin up our service (:sob: I'm dying here) ##

First thing first: go to app.module.ts

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
We need something to wait for so we can test our spinner. 

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

## Step 4 - Spin up the overlay ##

It's finally business time, so let's review our goals
 + Display a MatProgressSpinner as an overlay
 + Pass it configuration data using InjectTokens
 
 - Add a MatProgressSpinner in spinner.component.[ts|htmlcss]
 We are going to add the default MatProgressSpinner to our spinner
 component.  This one is taken right out of [Angular
 Material](https://material.angular.io/components/progress-spinner/examples
 "Angular Material MatProgressSpinner") but you could use straight css
 too... perhaps look to [SpinKit](https://tobiasahlin.com/spinkit/
 "SpinKit") for inspiration.
 
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

```css
.spinner-margin {
  margin: 0 10px;
}
```

- Now let's deal with the
  [CDK](https://material.angular.io/cdk/categories "CDK"),  The
  Angular guys say

    >   The Component Dev Kit (CDK) is a set of tools that implement
    >   common interaction patterns whilst being unopinionated about their
    >   presentation. It represents an abstraction of the core
    >   functionalities found in the Angular Material library, without any
    >   styling specific to Material Design. Think of the CDK as a blank
    >   state of well-tested functionality upon which you can develop your
    >   own bespoke components.
  
 All right then, let's start elucidating 
 
  * We are using Angular Material so we don't need to `@import
 '~@angular/cdk/overlay-prebuilt.css';` *

 
 - Overlays need an OverlayConfig that defines backdrop, panel,
 position strategy and scroll strategy. 
 
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

 
src/styles.scss (add the dark-back-drop styles)
```css
.cdk-overlay-backdrop.cdk-overlay-backdrop-showing {
  &.dark-backdrop {
    background: #000;
    opacity: 0.65 !important;
  }
}
```

- An Overlay has content injected into it with a Portal so we need to
create our Overlay using the config we just defined and then tell it
to display our spinner component using the Portal interface (harder
said than done)

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
please, click the green button and ... nothing happened????

### Let's take a quick sidetrack on what overlays really do and how to
debug them ###

If you followed these steps just like I put them in this probably
happened to you to so how would we debug this.  First we need to know
what should happen.  All overlays get created in a div element with  cdk-overlay-container
class.  

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
Some things to note you can see there is a 
- a div element with a cdk-overlay-backdrop class and our custom
  back-drop class (dark-backdrop)
- a div element with a cdk-global-overlay-wrapper class
that seems to be respecting our positioning strategy (global and
centered)
- a div element with class cdk-overlay-0 which has our app-spinner tag
  in it
  
  So that is all basically good news.  We seem to have created the
  overlay we meant to create, and yet no spinner.  In this case the
  problem doesn't seem to be with the overlay at all.  Most of you
  have already spotted the error message in console that we've been
  ignoring.  The problem in this case is that we haven't defined the
  default theme for Material.  Let's do so
  
  styles.scss
  ```
  @import '@angular/material/prebuilt-themes/deeppurple-amber.css';
```

And now we have our spinner (it still isn't very exciting because it
is just a half circle not doing anything but hey...baby steps)

## Step 5 - Spin-ding 👊🏼 some quality time with our component ##
We are almost there one tricky bit left.  Somehow we need to talk with
our spinner.component.ts so we can tell it what kind of spinner we
want and when to turn and off etc.  The way this is accomplished is
through the use of a custom InjectionToken.
