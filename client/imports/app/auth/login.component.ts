import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Meteor } from 'meteor/meteor';
import { Router } from '@angular/router';
import { MeteorObservable } from 'meteor-rxjs';

import template from './login.component.html';

@Component({
  selector: 'login',
  template
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: string;

  constructor(private router: Router, private zone: NgZone, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.error = '';
  }

  login() {
    if (this.loginForm.valid) {
      Meteor.loginWithPassword(this.loginForm.value.email, this.loginForm.value.password, (err) => {
        if (err) {
          this.zone.run(() => {
            this.error = err;
          });
        } else {
          // this.router.navigate(['home/student/']);
          this.reroute();
        }
      });
    }
  }

  reroute() {
    var id = Meteor.userId();
    if (this.checkPremissions('client', 'default-group')) {
      this.router.navigate(['client/']);
    } else if (this.checkPremissions('student', 'default-group') ||
               this.checkPremissions('pm', 'default-group')) {
      this.router.navigate(['student/']);
    } else {
      this.router.navigate(['']);
    }

  }

  checkPremissions(accountType: string, group: string): boolean {
    var booleanValue = Roles.userIsInRole(Meteor.userId(),
                              [accountType], group);
    return booleanValue;
  }
}
