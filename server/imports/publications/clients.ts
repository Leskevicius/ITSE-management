import { Meteor } from 'meteor/meteor';
import { Clients } from '../../../both/collections/clients.collection';

Meteor.publish('clients', () => Clients.find());

Meteor.publish('client', function(cclientId: string) {
  return Clients.find({clientId: cclientId});
});
