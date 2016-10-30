import { Meteor } from 'meteor/meteor';
import { Projects } from '../../../both/collections/projects.collection';

// Meteor.publish('projects', () => Projects.find());

Meteor.publish('projects', function() {
  return Projects.find(buildQuery.call(this));
});

Meteor.publish('client-projects', function(clientId: string) {
  return Projects.find(buildQuery.call(this, clientId));
});

function buildQuery(_clientId?: string): Object {
  const isAvailable = {}
  if (_clientId) {
    return {
      $and: [
        {clientId: _clientId},
        isAvailable
      ]
    };
  }
  return isAvailable;
}
