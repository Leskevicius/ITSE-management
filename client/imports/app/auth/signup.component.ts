import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Accounts } from 'meteor/accounts-base';

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



  signup() {
    if (this.signupForm.valid) {
      this.id = Accounts.createUser({
        email: this.signupForm.value.email,
        password: this.signupForm.value.password
      }, (err) => {
        if (err) {
          this.zone.run(() => {
            this.error = err;
          });
        } else {
          Roles.addUsersToRoles(this.id, 'student', 'default-group');
          this.router.navigate(['home/student/']);
        }
      });

    }
  }
}
