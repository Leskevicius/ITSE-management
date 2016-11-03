import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccountsModule } from 'angular2-meteor-accounts-ui';
// import { Roles } from 'meteor/alanning:roles';

import { AppComponent } from './app.component';
import { routes, ROUTES_PROVIDERS } from './app.routes';
import { SHARED_DECLARATIONS } from './shared';
import { HOME_DECLARATIONS } from './home';
import { AUTH_DECLARATIONS } from './auth';
import { LANDING_DECLARATIONS } from './landing';
import { STUDENT_HOME_DECLARATIONS } from './home/student';
import { CLIENT_HOME_DECLARATIONS } from './home/client';
import { PROJECTS_DECLARATIONS } from './projects';
import { TEAMS_DECLARATIONS } from './teams';

// Material stuff
import { MdButtonModule } from "@angular2-material/button";
import { MdToolbarModule } from "@angular2-material/toolbar";
import { MdInputModule } from "@angular2-material/input";
import { MdCardModule } from "@angular2-material/card";
import { MdCoreModule } from "@angular2-material/core";
import { MdCheckboxModule } from "@angular2-material/checkbox";
import { MdListModule } from "@angular2-material/list";
import { MdRadioModule } from "@angular2-material/radio";

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AccountsModule,
    FormsModule,
    ReactiveFormsModule,
    // Roles,
    // material stuff
    MdCoreModule.forRoot(),
    MdButtonModule.forRoot(),
    MdToolbarModule.forRoot(),
    MdInputModule.forRoot(),
    MdCardModule.forRoot(),
    MdCheckboxModule.forRoot(),
    MdListModule.forRoot(),
    MdRadioModule.forRoot()
  ],
  declarations: [
    AppComponent,
    SHARED_DECLARATIONS,
    HOME_DECLARATIONS,
    AUTH_DECLARATIONS,
    LANDING_DECLARATIONS,
    STUDENT_HOME_DECLARATIONS,
    CLIENT_HOME_DECLARATIONS,
    PROJECTS_DECLARATIONS,
    TEAMS_DECLARATIONS
  ],
  providers: [
    ...ROUTES_PROVIDERS
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
