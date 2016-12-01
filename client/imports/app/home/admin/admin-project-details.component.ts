import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/map';

import { Projects } from '../../../../../both/collections/projects.collection';
import { Project } from '../../../../../both/models/project.model';

import template from './admin-project-details.component.html';

@Component({
  selector: 'admin-project-details',
  template
})
export class AdminProjectDetailsComponent implements OnInit, OnDestroy {
  projectId: string;
  paramsSub: Subscription;
  project: Project;

  constructor(private route: ActivatedRoute) {}

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
}
