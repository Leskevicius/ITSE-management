import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/map';

import { Projects } from '../../../../both/collections/projects.collection';
import { Project } from '../../../../both/models/project.model';

import template from './project-details.component.html';

@Component({
  selector: 'project-details',
  template
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {
  projectId: string;
  paramsSub: Subscription;
  project: Project;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.paramsSub = this.route.params
    .map(params => params['projectId'])
    .subscribe(projectId => {
      this.projectId = projectId;

      this.project = Projects.findOne(this.projectId);
    });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }
}
