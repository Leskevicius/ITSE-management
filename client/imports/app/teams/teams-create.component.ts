import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Meteor } from 'meteor/meteor';

import { Teams } from '../../../../both/collections/teams.collection';
import { Students } from '../../../../both/collections/students.collection';
import { Student } from '../../../../both/models/student.model';

import template from './teams-create.component.html';

@Component({
  selector: 'teams-create',
  template
})
export class TeamsCreateComponent implements OnInit {
  addForm: FormGroup;
  student: Student
  // studentSub: Subscription

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  addTeam(): void {
    if (this.addForm.valid) {
      Teams.insert({
        name: this.addForm.value.name,
        owner: Meteor.userId()
      });
      // must register students entry with team document id
      var id = Teams.findOne({owner: Meteor.userId()})._id

      console.log(id);

      Students.update({studentId: Meteor.userId()}, {
        $set: {
          teamId: id
        }
      })

      console.log("added new team");
      this.addForm.reset();
    }
  }
}
