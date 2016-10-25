import { Meteor } from 'meteor/meteor';

import { loadProjects } from './imports/fixtures/projects';

import './imports/publications/projects'; 

Meteor.startup(() => {
  loadProjects();
});
