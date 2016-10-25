import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Projects } from '../../../../both/collections/projects.collection';
import { Project } from '../../../../both/models/project.model';

import template from './projects-list.component.html';

@Component({
 selector: 'project-list',
 template
})
export class ProjectsListComponent {
  projects: Observable<Project[]>;

  constructor() {
    this.projects = Projects.find({}).zone();
  }
}
