import { Component, OnInit, OnDestroy} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';

import { Projects } from '../../../../both/collections/projects.collection';
import { Project } from '../../../../both/models/project.model';

import { Students } from '../../../../both/collections/students.collection';
import { Student } from '../../../../both/models/student.model';

import template from './projects-bid.component.html';

@Component({
 selector: 'project-bid',
 template
})
export class ProjectsBidComponent implements OnInit, OnDestroy {
  projects: Observable<Project[]>;
  projectsSub: Subscription;
  student: Student;
  studentSub: Subscription;

  ngOnInit() {
    this.projects = Projects.find({}).zone();
    this.projectsSub = MeteorObservable.subscribe('projects').subscribe();

    this.studentSub = MeteorObservable.subscribe('student', Meteor.userId()).subscribe(() => {
      MeteorObservable.autorun().subscribe(() => {
        this.student = Students.findOne({studentId: Meteor.userId()});
      });
    });
  }

  ngOnDestroy() {
    this.projectsSub.unsubscribe();
  }
}
