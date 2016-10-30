import { Meteor } from 'meteor/meteor';
import { Students } from '../../../both/collections/students.collection';

Meteor.publish('students', () => Students.find());
