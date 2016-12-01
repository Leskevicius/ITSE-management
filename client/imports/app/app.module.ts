import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccountsModule } from 'angular2-meteor-accounts-ui';

import { AppComponent } from './app.component';
import { routes, ROUTES_PROVIDERS } from './app.routes';
import { SHARED_DECLARATIONS } from './shared';
import { HOME_DECLARATIONS } from './home';
import { AUTH_DECLARATIONS } from './auth';
import { LANDING_DECLARATIONS } from './landing';
import { STUDENT_HOME_DECLARATIONS } from './home/student';
import { CLIENT_HOME_DECLARATIONS } from './home/client';
import { ADMIN_HOME_DECLARATIONS } from './home/admin';
import { PROJECTS_DECLARATIONS } from './projects';
import { TEAMS_DECLARATIONS } from './teams';

import { MaterialModule } from "@angular/material";

import { DragulaModule } from 'ng2-dragula/ng2-dragula';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AccountsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule.forRoot(),
    DragulaModule
  ],
  declarations: [
    AppComponent,
    SHARED_DECLARATIONS,
    HOME_DECLARATIONS,
    AUTH_DECLARATIONS,
    LANDING_DECLARATIONS,
    STUDENT_HOME_DECLARATIONS,
    CLIENT_HOME_DECLARATIONS,
    ADMIN_HOME_DECLARATIONS,
    PROJECTS_DECLARATIONS,
    TEAMS_DECLARATIONS,
  ],
  providers: [
    ...ROUTES_PROVIDERS
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
