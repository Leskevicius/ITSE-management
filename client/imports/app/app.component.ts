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
}
