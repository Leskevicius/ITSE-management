import { Component, OnInit } from '@angular/core';
import { Meteor } from 'meteor/meteor';
import { Router } from '@angular/router';

import template from './student-home.component.html';

@Component({
  selector: 'student-home',
  template
})
export class StudentHomeComponent implements OnInit {
  // amI: boolean = false;
  //
  // checkIt() {
  //   this.amI = Roles.userIsInRole(Meteor.userId(),
  //                           ['student'], 'default-group');
  // }

  ngOnInit() {

  }

}
