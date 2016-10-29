import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Meteor } from 'meteor/meteor';

import { Teams } from '../../../../both/collections/teams.collection';

import template from './teams-create.component.html';

@Component({
  selector: 'teams-create',
  template
})
export class TeamsCreateComponent implements OnInit {
  addForm: FormGroup;

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

      console.log("added new team");
      this.addForm.reset();
    }
  }
}
