import { Route } from '@angular/router';
import { Meteor } from 'meteor/meteor';

// student stuff
import { StudentHomeComponent } from './home/student/student-home.component';
import { UpdateStudentProfileComponent } from './home/student/update-student-profile.component';


// client stuff
import { ClientHomeComponent } from './home/client/client-home.component';
import { UpdateClientProfileComponent } from './home/client/update-client-profile.component';

// landing page @ account management stuff
import { LandingPageComponent } from './landing/landing-page.component';
import { LoginComponent } from './auth/login.component';
import { SignupComponent } from './auth/signup.component';
import { RecoverComponent } from "./auth/recover.component";

// project stuff
import { ProjectsListComponent } from './projects/projects-list.component';
import { ProjectDetailsComponent } from './projects/project-details.component';
import { ProjectsFormComponent } from './projects/projects-form.component';
// client project list...uses different publication to show only their projects
import { ProjectsClientListComponent } from './projects/projects-client-list.component';

// team stuff
import { TeamsCreateComponent } from './teams/teams-create.component';
import { TeamsListComponent } from './teams/teams-list.component';


export const routes: Route[] = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'recover', component: RecoverComponent },
  { path: 'student', component: StudentHomeComponent, canActivate: ['canActivateForStudent']},
  { path: 'student/profile', component: UpdateStudentProfileComponent, canActivate: ['canActivateForStudent'] },
  { path: 'client', component: ClientHomeComponent, canActivate: ['canActivateForClient']},
  { path: 'client/projects', component: ProjectsClientListComponent, canActivate: ['canActivateForClient'] },
  { path: 'client/profile', component: UpdateClientProfileComponent, canActivate: ['canActivateForClient'] },
  { path: 'projects', component: ProjectsListComponent, canActivate: ['canActivateForLoggedIn'] },
  { path: 'project/:projectId', component: ProjectDetailsComponent, canActivate: ['canActivateForLoggedIn'] },
  { path: 'projects/create', component: ProjectsFormComponent },
  { path: 'teams', component: TeamsListComponent, canActivate: ['canActivateForLoggedIn'] },
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
