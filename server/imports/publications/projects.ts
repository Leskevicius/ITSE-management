import { Meteor } from 'meteor/meteor';
import { Projects } from '../../../both/collections/projects.collection';

Meteor.publish('projects', () => Projects.find());
