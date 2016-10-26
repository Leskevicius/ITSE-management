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
  isSudent: boolean = false;
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
        this.router.navigate(['home/' + this.accountType + '/']);
      });
    }
  }

  signup() {
    if (this.signupForm.valid) {
      this.fixAccountType();
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

  fixAccountType() {
    if (this.isClient) {
      this.accountType = 'client';
    } else {
      this.accountType = 'student';
    }
  }
}
