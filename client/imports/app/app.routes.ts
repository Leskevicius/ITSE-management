import { Route } from '@angular/router';
import { Meteor } from 'meteor/meteor';

import { ProjectDetailsComponent } from './projects/project-details.component';
import { HomeComponent } from './home/home.component';
import { StudentHomeComponent } from './home/student/student-home.component';
import { ClientHomeComponent } from './home/client/client-home.component';

import { LandingPageComponent } from './landing/landing-page.component';
import { LoginComponent } from './auth/login.component';
import { SignupComponent } from './auth/signup.component';
import { RecoverComponent } from "./auth/recover.component";
import { AppComponent } from './app.component';

import { ProjectsListComponent } from './projects/projects-list.component';

export const routes: Route[] = [
  { path: 'project/:projectId', component: ProjectDetailsComponent, canActivate: ['canActivateForLoggedIn'] },
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'recover', component: RecoverComponent },
  { path: 'home/student', component: StudentHomeComponent, canActivate: ['canActivateForStudent']},
  { path: 'home/client', component: ClientHomeComponent, canActivate: ['canActivateForClient']},
  { path: 'projects', component: ProjectsListComponent, canActivate: ['canActivateForLoggedIn'] }
];

export const ROUTES_PROVIDERS = [{
  provide: 'canActivateForLoggedIn',
  useValue: () => !! Meteor.userId()
},
{
  provide: 'canActivateForStudent',
  useValue: () => checkPremissions('student', 'default-group')
},
{
  provide: 'canActivateForClient',
  useValue: () => checkPremissions('client', 'default-group')
},
{
  provide: 'canActivateForAdmin',
  useValue: () => checkPremissions('admin', Roles.GLOBAL_GROUP)
}];


function checkPremissions(accountType: string, group: string) {
  return Roles.userIsInRole(Meteor.userId(),
                            [accountType], group);
}
