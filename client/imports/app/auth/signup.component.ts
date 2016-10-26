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
        this.router.navigate(['home/student/']);
      });
    }
  }

  signup() {
    if (this.signupForm.valid) {
      MeteorObservable.call('signup', this.signupForm.value.email, this.signupForm.value.password).subscribe(() => {
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
