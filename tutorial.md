Spinners had me wrapped around an axel
=====================================
**Author:** *Timothy Greenfield*
**Date:** *5/13/19*

*but I got free*

Before we begin I feel compelled to tell you that I'm having a small
crisis at the moment.  I really don't see the need for puns or clever
titles in technical blogs (ditto for the clever top picture). But,
some times I just can't help myself.  Anyways I don't want this soul
searching to spin out of control so let's get going...

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


