import { MongoObservable } from 'meteor-rxjs';
import { Meteor } from 'meteor/meteor';

import { Client } from '../models/client.model';

export const Clients = new MongoObservable.Collection<Client>('clients');


function loggedIn() {
  return !!Meteor.user();
}

Clients.allow({
  insert: loggedIn,
  update: loggedIn,
  remove: loggedIn
});
