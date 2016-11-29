import { Meteor } from 'meteor/meteor';
import { Students } from '../../../both/collections/students.collection';
import { Student } from '../../../both/models/student.model';


Meteor.publish('students', function() {
  return Students.find(buildQuery.call(this));
});

Meteor.publish('students', function(teamId: string) {
  return Students.find(buildQuery.call(teamId));
});

Meteor.publish('student', function(sstudentId: string) {
  return Students.find({studentId: sstudentId});
});

function buildQuery(teamId: string): Object {
  if ( teamId ) {
    return {
       teamId: teamId
    };
  }
  else {
    return {};
  }
}
