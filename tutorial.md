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
npm install @angular/material @angular/cdk
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
- Import MatProgressSpinnerModule 
  
It should look like this when you are done

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component`;
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerService } from './spinner/spinner.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
    declarations: [
        AppComponent,
        SpinnerComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatProgressSpinnerModule

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

