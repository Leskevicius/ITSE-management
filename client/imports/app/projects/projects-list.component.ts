import { Component, OnInit, OnDestroy} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';

import { Projects } from '../../../../both/collections/projects.collection';
import { Project } from '../../../../both/models/project.model';

import template from './projects-list.component.html';

@Component({
 selector: 'project-list',
 template
})
export class ProjectsListComponent implements OnInit, OnDestroy {
  projects: Observable<Project[]>;
  projectsSub: Subscription;

  ngOnInit() {
    this.projects = Projects.find({}).zone();
    this.projectsSub = MeteorObservable.subscribe('projects').subscribe();
  }

  ngOnDestroy() {
    this.projectsSub.unsubscribe();
  }
}
