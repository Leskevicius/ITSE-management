import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';


import 'rxjs/add/operator/map';

import { Students } from '../../../../../both/collections/students.collection';
import { Student } from '../../../../../both/models/student.model';

import { Projects } from '../../../../../both/collections/projects.collection';
import { Project } from '../../../../../both/models/project.model';

import template from './admin-student-details.component.html';

@Component({
  selector: 'admin-student-details',
  template
})
export class AdminStudentDetailsComponent implements OnInit, OnDestroy {
  studentId: string;
  paramsSub: Subscription;
  studentsSub: Subscription;
  student: Student;
  projects: Project[];
  projectsSub: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.paramsSub = this.route.params
    .map(params => params['studentId'])
    .subscribe(studentId => {
      this.studentId = studentId;
      this.studentsSub = MeteorObservable.subscribe('students').subscribe(() => {
        this.student = Students.findOne(this.studentId);
        if (!this.student) {
          console.log("no student found");
          this.student = Students.findOne({studentId: this.studentId});
          if (!this.student) {
            console.log("no student found2");
          }
        }
      });

      this.projectsSub = MeteorObservable.subscribe('projects').subscribe(() => {
        this.projects = Projects.find({}).fetch();
      });
    });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
    this.projectsSub.unsubscribe();
    this.studentsSub.unsubscribe();
  }
}
