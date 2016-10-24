import { Route } from '@angular/router';
import { Meteor } from 'meteor/meteor';

// import { PartiesListComponent } from './parties/parties-list.component';
// import { PartyDetailsComponent } from './parties/party-details.component';
import { HomeComponent } from './home/home.component';
// import { SignupComponent } from './auth/signup.component';
// import { RecoverComponent } from "./auth/recover.component";
import { AppComponent } from './app.component';

export const routes: Route[] = [
  // { path: 'asd', component: AppComponent },
  // { path: 'party/:partyId', component: PartyDetailsComponent, canActivate: ['canActivateForLoggedIn']},
  { path: '', component: HomeComponent },
  // { path: 'signup', component: SignupComponent },
  // { path: 'recover', component: RecoverComponent }
];

export const ROUTES_PROVIDERS = [{
  // provide: 'canActivateForLoggedIn',
  // useValue: () => !! Meteor.userId()
}];
