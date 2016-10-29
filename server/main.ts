import { Meteor } from 'meteor/meteor';

import { loadProjects } from './imports/fixtures/projects';

import './imports/publications/projects';
import './imports/publications/teams';
import './imports/methods/signup.methods';

Meteor.startup(() => {
  loadProjects();
});
