import { MongoObservable } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';

import { Student } from '../models/student.model';

export const Students = new MongoObservable.Collection<Student>('students');


function loggedIn() {
  return !!Meteor.user();
}

Students.allow({
  insert: loggedIn,
  update: loggedIn,
  remove: loggedIn
});
