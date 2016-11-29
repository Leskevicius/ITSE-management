import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/map';

import { Students } from '../../../../../both/collections/students.collection';
import { Student } from '../../../../../both/models/student.model';

import template from './student-details.component.html';

@Component({
  selector: 'student-details',
  template
})
export class StudenttDetailsComponent implements OnInit, OnDestroy {
  studentId: string;
  paramsSub: Subscription;
  student: Student;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.paramsSub = this.route.params
    .map(params => params['studentId'])
    .subscribe(studentId => {
      this.studentId = studentId;
      this.student = Students.findOne(this.studentId);
    });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }
}
