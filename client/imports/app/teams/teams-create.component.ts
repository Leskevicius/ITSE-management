import { Meteor } from 'meteor/meteor';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';
import { Router } from '@angular/router';

import { Teams } from '../../../../both/collections/teams.collection';
import { Students } from '../../../../both/collections/students.collection';
import { Student } from '../../../../both/models/student.model';

import { ProjectBid } from '../../../../both/models/project-bid.model';
import { StudentBid } from '../../../../both/models/student-bid.model'

import template from './teams-create.component.html';

@Component({
  selector: 'teams-create',
  template
})
export class TeamsCreateComponent implements OnInit, OnDestroy {
  addForm: FormGroup;
  student: Student
  studentSub: Subscription

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.studentSub = MeteorObservable.subscribe('student', Meteor.userId()).subscribe(() => {
      this.student = Students.findOne({studentId: Meteor.userId()});
    });

    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  addTeam(): void {
    if (this.addForm.valid) {
      var myNewBid: StudentBid = {
        studentId: this.student.studentId,
        bids: this.student.bids
      }

      Teams.insert({
        name: this.addForm.value.name,
        owner: Meteor.userId(),
        memberId: [Meteor.userId()],
        projectBids: [myNewBid]
      });
      // must register students entry with team document id
      var id = Teams.findOne({owner: Meteor.userId()})._id;

      Students.update(this.student._id, {
        $set: {
          teamId: id
        }
      });

      this.addForm.reset();

      this.router.navigate(['/student'])
    }
  }

  ngOnDestroy() {
    this.studentSub.unsubscribe();
  }
}
