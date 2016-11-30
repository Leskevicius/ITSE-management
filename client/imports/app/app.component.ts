import { Component } from '@angular/core';
import { Router } from '@angular/router';

import template from './app.component.html';
import { InjectUser } from 'angular2-meteor-accounts-ui';

@Component({
  selector: 'app',
  template
})
@InjectUser('user')
export class AppComponent {
  constructor(private router: Router) {}

  logout() {
    Meteor.logout();
    this.router.navigate(['/']);
  }

  checkPremissions(accountType: string, group: string): boolean {
    var booleanValue = Roles.userIsInRole(Meteor.userId(),
                              [accountType], group);
    return booleanValue;
  }

  reroute() {
    if (this.checkPremissions('student','default-group') ||
        this.checkPremissions('pm','default-group')) {
      this.router.navigate(['/student/']);
    } else if (this.checkPremissions('client','default-group')) {
      this.router.navigate(['/client/']);
    } else if (this.checkPremissions('admin',Roles.GLOBAL_GROUP)) {
      this.router.navigate(['/admin/']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
