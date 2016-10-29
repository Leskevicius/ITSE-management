import { Meteor } from 'meteor/meteor';
import { Projects } from '../../../both/collections/projects.collection';

// Meteor.publish('projects', () => Projects.find());

Meteor.publish('projects', function() {
  return Projects.find(buildQuery.call(this));
});

Meteor.publish('projects', function(clientId: string) {
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

// function buildQuery(partyId?: string): Object {
//   const isAvailable = {
//     $or: [{
//       // party is public
//       public: true
//     },
//     // or
//     {
//       // current user is the owner
//       $and: [{
//         owner: this.userId
//       }, {
//         owner: {
//           $exists: true
//         }
//       }]
//     }]
//   };
//
//   if (partyId) {
//     return {
//       // only single party
//       $and: [{
//           _id: partyId
//         },
//         isAvailable
//       ]
//     };
//   }
//
//   return isAvailable;
// }
