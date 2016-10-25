import { Route } from '@angular/router';
import { Meteor } from 'meteor/meteor';

// import { PartiesListComponent } from './parties/parties-list.component';
// import { PartyDetailsComponent } from './parties/party-details.component';
import { HomeComponent } from './home/home.component';
import { StudentHomeComponent } from './home/student/student-home.component';

import { LandingPageComponent } from './landing/landing-page.component';
import { LoginComponent } from './auth/login.component';
import { SignupComponent } from './auth/signup.component';
import { RecoverComponent } from "./auth/recover.component";
import { AppComponent } from './app.component';

import { ProjectsListComponent } from './projects/projects-list.component';

export const routes: Route[] = [
  // { path: 'asd', component: AppComponent },
  // { path: 'party/:partyId', component: PartyDetailsComponent, canActivate: ['canActivateForLoggedIn']},
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'recover', component: RecoverComponent },
  { path: 'home/student', component: StudentHomeComponent },
  { path: 'projects', component: ProjectsListComponent }
];

export const ROUTES_PROVIDERS = [{
  // provide: 'canActivateForLoggedIn',
  // useValue: () => !! Meteor.userId()
}];
