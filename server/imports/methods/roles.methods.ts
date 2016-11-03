import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import { Clients } from '../../../both/collections/clients.collection';
import { Students } from '../../../both/collections/students.collection';


Meteor.methods({
  checkPremissions: function (userId: string, role: string, group: string): boolean {
    return Roles.userIsInRole(userId, role, group);
  }
});
