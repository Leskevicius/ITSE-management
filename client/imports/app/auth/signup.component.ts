import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Accounts } from 'meteor/accounts-base';
import { MeteorObservable } from 'meteor-rxjs';

import template from './signup.component.html';

@Component({
  selector: 'signup',
  template
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  error: string;
  isClient: boolean = true;
  isStudent: boolean = false;
  isPM: boolean = false;
  id: string;
  accountType: string = 'student';

  constructor(private router: Router, private zone: NgZone, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.error = '';
  }

  login() {
    if (this.signupForm.valid) {
      Meteor.loginWithPassword(this.signupForm.value.email, this.signupForm.value.password, () => {
        if (this.accountType === 'pm') {
          this.router.navigate(['student/'])
        } else {
          this.router.navigate([this.accountType + '/']);
        }
      });
    }
  }

  signup() {
    if (this.signupForm.valid) {
      MeteorObservable.call('signup', this.signupForm.value.email, this.signupForm.value.password, this.accountType).subscribe(() => {
        //success
        this.login();
        console.log('account created, logged in, redirected...');
      }, (error) => {
        this.zone.run(() => {
          this.error = error;
        });
      });
    }
  }
}
