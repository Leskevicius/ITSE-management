import { Meteor } from 'meteor/meteor';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';

import { Students } from '../../../../../both/collections/students.collection';
import { Student } from '../../../../../both/models/student.model';

import template from './update-student-profile.component.html';

@Component({
  selector: 'update-student-profile',
  template
})
export class UpdateStudentProfileComponent implements OnInit, OnDestroy {
  student: Student;
  studentSub: Subscription;


  constructor(private router: Router) {}

  ngOnInit() {
    this.studentSub = MeteorObservable.subscribe('student', Meteor.userId()).subscribe(() => {
      this.student = Students.findOne({studentId: Meteor.userId()});
    });

    if ( this.student ) {
      console.log('success');
    }
  }


  updateStudent() {
    Students.update(this.student._id, {
      $set: {
        'contact.email' : this.student.contact.email,
        'contact.phone' : this.student.contact.phone
      }
    });

    this.router.navigate(['/student/']);
  }

  ngOnDestroy() {
    this.studentSub.unsubscribe();
  }
  // saveParty() {
  //   Parties.update(this.party._id, {
  //     $set: {
  //       name: this.party.name,
  //       description: this.party.description,
  //       location: this.party.location
  //     }
  //   });
  // }
}
