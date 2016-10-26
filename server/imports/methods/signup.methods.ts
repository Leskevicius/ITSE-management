import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Meteor.methods({
  signup: function (passedEmail: string, passedPassword: string, accountType: string) {
    this.id = Accounts.createUser({
      email: passedEmail,
      password: passedPassword
    });
    Roles.addUsersToRoles(this.id, accountType, 'default-group');
    console.log(this.id);
  }
});
