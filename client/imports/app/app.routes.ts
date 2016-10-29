import { Route } from '@angular/router';
import { Meteor } from 'meteor/meteor';

// home stuff
import { StudentHomeComponent } from './home/student/student-home.component';
import { ClientHomeComponent } from './home/client/client-home.component';

// landing page @ account management stuff
import { LandingPageComponent } from './landing/landing-page.component';
import { LoginComponent } from './auth/login.component';
import { SignupComponent } from './auth/signup.component';
import { RecoverComponent } from "./auth/recover.component";
import { AppComponent } from './app.component';

// project stuff
import { ProjectsListComponent } from './projects/projects-list.component';
import { ProjectDetailsComponent } from './projects/project-details.component';

// team stuff
import { TeamsCreateComponent } from './teams/teams-create.component';
import { TeamsListComponent } from './teams/teams-list.component';


export const routes: Route[] = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'recover', component: RecoverComponent },
  { path: 'home/student', component: StudentHomeComponent, canActivate: ['canActivateForStudent']},
  { path: 'home/client', component: ClientHomeComponent, canActivate: ['canActivateForClient']},
  { path: 'projects', component: ProjectsListComponent, canActivate: ['canActivateForLoggedIn'] },
  { path: 'project/:projectId', component: ProjectDetailsComponent, canActivate: ['canActivateForLoggedIn'] },
  { path: 'teams/create', component: TeamsCreateComponent, canActivate: ['canActivateForStudent'] }
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
  var booleanValue = Roles.userIsInRole(Meteor.userId(),
                            [accountType], group);
  console.log("premission checked. value: ", booleanValue);
  return booleanValue;
}
