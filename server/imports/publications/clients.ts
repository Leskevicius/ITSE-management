import { Meteor } from 'meteor/meteor';
import { Clients } from '../../../both/collections/clients.collection';

Meteor.publish('clients', () => Clients.find());
