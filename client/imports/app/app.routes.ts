import { Route } from '@angular/router';
import { Meteor } from 'meteor/meteor';
// student stuff
import { StudentHomeComponent } from './home/student/student-home.component';
import { UpdateStudentProfileComponent } from './home/student/update-student-profile.component';
import { StudenttDetailsComponent } from './home/student/student-details.component';

// client stuff
import { ClientHomeComponent } from './home/client/client-home.component';
import { UpdateClientProfileComponent } from './home/client/update-client-profile.component';

// admin stuff
import { AdminHomeComponent } from './home/admin/admin-home.component';
import { AdminClientListComponent } from './home/admin/admin-client-list.component';
import { AdminClientDetailsComponent } from './home/admin/admin-client-details.component';
import { AdminStudentListComponent } from './home/admin/admin-student-list.component';
import { AdminStudentDetailsComponent } from './home/admin/admin-student-details.component';
import { AdminTeamsListComponent } from './home/admin/admin-teams-list.component';
import { AdminTeamDetailsComponent } from './home/admin/admin-team-details.component';
import { AdminProjectsListComponent } from './home/admin/admin-projects-list.component';
import { AdminProjectDetailsComponent } from './home/admin/admin-project-details.component';
import { AdminTeamScoresComponent } from './home/admin/admin-team-scores.component';

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
import { ProjectsBidComponent } from './projects/projects-bid.component';

// team stuff
import { TeamsCreateComponent } from './teams/teams-create.component';
import { TeamsListComponent } from './teams/teams-list.component';
import { TeamHomeComponent } from './teams/team-home.component';
import { TeamsJoinComponent } from './teams/teams-join.component';
import { TeamRecComponent } from './teams/team-recommendation.component';
import { TeamMembersComponent } from './teams/team-members.component';



export const routes: Route[] = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'recover', component: RecoverComponent },
  { path: 'student', component: StudentHomeComponent, canActivate: ['canActivateForStudent']},
  { path: 'student/profile', component: UpdateStudentProfileComponent, canActivate: ['canActivateForStudent'] },
  { path: 'student/:studentId', component: StudenttDetailsComponent, canActivate: ['canActivateForStudent']},
  { path: 'client', component: ClientHomeComponent, canActivate: ['canActivateForClient']},
  { path: 'client/projects', component: ProjectsClientListComponent, canActivate: ['canActivateForClient'] },
  { path: 'client/profile', component: UpdateClientProfileComponent, canActivate: ['canActivateForClient'] },
  { path: 'admin', component: AdminHomeComponent, canActivate: ['canActivateForAdmin']},
  { path: 'admin/clients', component: AdminClientListComponent, canActivate: ['canActivateForAdmin']},
  { path: 'admin/client/:clientId', component: AdminClientDetailsComponent, canActivate: ['canActivateForAdmin']},
  { path: 'admin/students', component: AdminStudentListComponent, canActivate: ['canActivateForAdmin']},
  { path: 'admin/student/:studentId', component: AdminStudentDetailsComponent, canActivate: ['canActivateForAdmin']},
  { path: 'admin/teams', component: AdminTeamsListComponent, canActivate: ['canActivateForAdmin']},
  { path: 'admin/team/:teamId', component: AdminTeamDetailsComponent, canActivate: ['canActivateForAdmin']},
  { path: 'admin/projects', component: AdminProjectsListComponent, canActivate: ['canActivateForAdmin']},
  { path: 'admin/project/:projectId', component: AdminProjectDetailsComponent, canActivate: ['canActivateForAdmin']},
  { path: 'admin/teamScores', component: AdminTeamScoresComponent, canActivate: ['canActivateForAdmin']},
  { path: 'projects', component: ProjectsListComponent, canActivate: ['canActivateForLoggedIn'] },
  { path: 'project/:projectId', component: ProjectDetailsComponent, canActivate: ['canActivateForLoggedIn'] },
  { path: 'projects/create', component: ProjectsFormComponent },
  { path: 'projects/bid', component: ProjectsBidComponent },
  { path: 'teams', component: TeamsListComponent, canActivate: ['canActivateForLoggedIn'] },
  { path: 'teams/create', component: TeamsCreateComponent, canActivate: ['canActivateForStudent'] },
  { path: 'team/:teamId', component: TeamHomeComponent, canActivate: ['canActivateForLoggedIn'] },
  { path: 'teams/join', component: TeamsJoinComponent, canActivate: ['canActivateForStudent'] },
  { path: 'team/:teamId/recommendation', component: TeamRecComponent, canActivate: ['canActivateForStudent'] },
  { path: 'team/:teamId/members', component: TeamMembersComponent, canActivate: ['canActivateForStudent'] }
];

export const ROUTES_PROVIDERS = [{
  provide: 'canActivateForLoggedIn',
  useValue: () => !! Meteor.userId()
},
{
  provide: 'canActivateForStudent',
  useValue: () => {
    return (checkPremissions('student', 'default-group') ||
    checkPremissions('pm', 'default-group'))
}},
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
  // console.log("premission checked. value: ", booleanValue);
  return booleanValue;
}
