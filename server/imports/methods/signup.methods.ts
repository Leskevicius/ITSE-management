import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import { Clients } from '../../../both/collections/clients.collection';
import { Students } from '../../../both/collections/students.collection';


Meteor.methods({
  signup: function (passedEmail: string, passedPassword: string, accountType: string) {
    this.id = Accounts.createUser({
      email: passedEmail,
      password: passedPassword
    });
    Roles.addUsersToRoles(this.id, accountType, 'default-group');
    console.log(this.id);
    if (accountType === 'client') {
      Clients.insert({
        clientId: this.id,
        contact: {email: '', phone: ''},
      });
      console.log('created Clients entry');
    }
    else if (accountType === 'student' ||
             accountType === 'pm') {
      Students.insert({
        studentId: this.id,
        contact: {email: '', phone: ''}
      });
      console.log('created Students entry');
    }
  }
});
