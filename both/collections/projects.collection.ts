import { MongoObservable } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';

import { Project } from '../models/project.model';

export const Projects = new MongoObservable.Collection<Project>('projects');


function loggedIn() {
  return !!Meteor.user();
}

Projects.allow({
  insert: loggedIn,
  update: loggedIn,
  remove: loggedIn
});
