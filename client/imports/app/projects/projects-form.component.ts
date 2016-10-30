import { Meteor } from 'meteor/meteor';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Projects } from '../../../../both/collections/projects.collection';

import template from './projects-form.component.html';

@Component({
  selector: 'projects-form',
  template
})
export class ProjectsFormComponent implements OnInit {
  addForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      features: ['', Validators.required],
      contact: ['', Validators.required]
    });
  }

  addProject(): void {
    if (this.addForm.valid) {
      Projects.insert({
        name: this.addForm.value.name,
        description: this.addForm.value.description,
        clientId: Meteor.userId(),
        features: this.addForm.value.features,
        contact: this.addForm.value.contact
      });

      this.addForm.reset();
      this.router.navigate(['client/']);
    }
  }
}
