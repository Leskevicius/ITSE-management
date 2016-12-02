import { Meteor } from 'meteor/meteor';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MeteorObservable } from 'meteor-rxjs';
import { Subscription } from 'rxjs/Subscription';


import { Projects } from '../../../../both/collections/projects.collection';
import { Project } from '../../../../both/models/project.model';


import { Clients } from '../../../../both/collections/clients.collection';
import { Client } from '../../../../both/models/client.model';

import template from './projects-form.component.html';

@Component({
  selector: 'projects-form',
  template
})

export class ProjectsFormComponent implements OnInit , OnDestroy {
  addForm: FormGroup;
  client: Client;
  clientsSub: Subscription;
  project: Project;
  projectsSub: Subscription;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      features: ['', Validators.required],
      contact: ['', Validators.required]
    });

    this.clientsSub = MeteorObservable.subscribe('clients').subscribe(() => {
      this.client = Clients.findOne({clientId: Meteor.userId()});
      this.projectsSub = MeteorObservable.subscribe('projects').subscribe(() => {
        this.project = Projects.findOne({clientId: this.client.clientId});
      });
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

      if (this.checkPremissions('admin', Roles.GLOBAL_GROUP)) {
        this.router.navigate(['admin/']);
      } else {
        //must update his projectId's
        var projectIds : string[] = this.client.projectId;
        projectIds.push(this.project._id);
        Clients.update(this.client._id, {
          $set: {
            projectId: projectIds
          }
        });
        this.router.navigate(['client/']);
      }
    }
  }

  checkPremissions(accountType: string, group: string): boolean {
    var booleanValue = Roles.userIsInRole(Meteor.userId(),
                              [accountType], group);
    return booleanValue;
  }

  ngOnDestroy() {
    this.clientsSub.unsubscribe();
    this.projectsSub.unsubscribe();
  }
}
