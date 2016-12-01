import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { Meteor } from 'meteor/meteor';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';
import { InjectUser } from 'angular2-meteor-accounts-ui';

import { Students } from '../../../../../both/collections/students.collection';
import { Student } from '../../../../../both/models/student.model';

import template from './student-home.component.html';


@Component({
  selector: 'student-home',
  template
})
@InjectUser('user')
export class StudentHomeComponent implements OnInit, OnDestroy {
  student: Student;
  studentSub: Subscription;
  teamId: string;

  isPM: boolean = false;
  hasTeam: boolean = false;;

  constructor(private zone: NgZone) {}

  ngOnInit() {
    this.studentSub = MeteorObservable.subscribe('student', Meteor.userId()).subscribe(() => {
      this.zone.run(() => {

        this.student = Students.findOne({studentId: Meteor.userId()});

        this.hasTeam = this.inTeam();

        this.isPM = this.checkPremissions('pm', 'default-group');
        if (this.hasTeam) {
          this.teamId = this.student.teamId;
        }
      });

    });
  }

  ngOnDestroy() {
    this.studentSub.unsubscribe();
  }

  checkPremissions(accountType: string, group: string): boolean {
    var booleanValue = Roles.userIsInRole(Meteor.userId(),
                              [accountType], group);
    return booleanValue;
  }

  inTeam(): boolean {
    if (this.student.teamId) {
      return true;
    } else return false;
  }

}
