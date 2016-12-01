import { Component, OnInit, OnDestroy} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';

import { Students } from '../../../../../both/collections/students.collection';
import { Student } from '../../../../../both/models/student.model';

import template from './admin-student-list.component.html';

@Component({
 selector: 'admin-student-list',
 template
})
export class AdminStudentListComponent implements OnInit, OnDestroy {
  students: Observable<Student[]>;
  studentsSub: Subscription;

  ngOnInit() {
    this.students = Students.find({}).zone();
    this.studentsSub = MeteorObservable.subscribe('students').subscribe();
  }

  ngOnDestroy() {
    this.studentsSub.unsubscribe();
  }
}
