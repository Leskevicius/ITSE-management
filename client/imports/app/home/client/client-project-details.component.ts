import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';


import 'rxjs/add/operator/map';

import { Projects } from '../../../../../both/collections/projects.collection';
import { Project } from '../../../../../both/models/project.model';

import template from './client-project-details.component.html';

@Component({
  selector: 'client-project-details',
  template
})
export class ClientProjectDetailsComponent implements OnInit, OnDestroy {
  projectId: string;
  paramsSub: Subscription;
  project: Project;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.paramsSub = this.route.params
    .map(params => params['projectId'])
    .subscribe(projectId => {
      this.projectId = projectId;
      console.log("projectID: ", this.projectId);
      this.project = Projects.findOne(this.projectId);
      console.log("Project name: ", this.project.name);
    });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }

  updateProject() {
    Projects.update(this.project._id, {
      $set: {
        name: this.project.name,
        description: this.project.description,
        features : this.project.features,
        contact : this.project.contact
      }
    });

    this.router.navigate(['/client']);
  }
}
