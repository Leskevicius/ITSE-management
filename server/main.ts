import { Meteor } from 'meteor/meteor';

import { loadProjects } from './imports/fixtures/projects';

//publishing collections
import './imports/publications/projects';
import './imports/publications/teams';
import './imports/publications/clients';
import './imports/publications/students';

//import signup method so client can call it
import './imports/methods/signup.methods';
import './imports/methods/roles.methods';


//loads placeholder projects
Meteor.startup(() => {
  loadProjects();
});
