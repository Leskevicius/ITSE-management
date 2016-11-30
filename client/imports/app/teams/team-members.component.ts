import { Component, OnInit, OnDestroy } from '@angular/core';
import { Meteor } from 'meteor/meteor';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';

import 'rxjs/add/operator/map';

import { Teams } from '../../../../both/collections/teams.collection';
import { Team } from '../../../../both/models/team.model';

import { Students } from '../../../../both/collections/students.collection';
import { Student } from '../../../../both/models/student.model';


import template from './team-members.component.html';

@Component({
  selector: 'team-members',
  template
})
export class TeamMembersComponent implements OnInit, OnDestroy {
  paramsSub: Subscription;
  teamId: string;
  teamSub: Subscription;
  team: Team;
  studentSub: Subscription;
  students: Observable<Student[]>;
  student: Student;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.paramsSub = this.route.params
    .map(params => params['teamId'])
    .subscribe(teamId => {
      this.teamId = teamId;

      this.teamSub = MeteorObservable.subscribe('team', this.teamId).subscribe(() => {
        this.team = Teams.findOne();

        this.studentSub = MeteorObservable.subscribe('students', this.teamId).subscribe(() => {
          this.students = Students.find({});
          this.student = Students.findOne({
            studentId : Meteor.userId()
          });
        });
      });
    });
  }



  ngOnDestroy() {
    this.paramsSub.unsubscribe();
    this.teamSub.unsubscribe();
    this.studentSub.unsubscribe();
  }
}
