import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Projects } from '../../../../both/collections/projects.collection';

import template from './projects-form.component.html';

@Component({
  selector: 'projects-form',
  template
})
export class ProjectsFormComponent implements OnInit {
  addForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      features: ['', Validators.required],
      contact: ['', Validators.required]
    });
  }

  addParty(): void {
    if (this.addForm.valid) {
      Projects.insert(this.addForm.value);

      this.addForm.reset();
    }
  }
}
