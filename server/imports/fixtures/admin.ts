import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

export function loadAdmin() {
  var adminAlreadyExists = Meteor.users.find({username: 'admin'}).count();
  if (adminAlreadyExists) {
    console.log("admin exists");
    return;
  } else {
    console.log("making new admin acc...");
    var Id : string = Accounts.createUser({
      username : 'admin',
      email : 'a@a.a',
      password : 'a'
    });

    Roles.addUsersToRoles(Id, 'admin', Roles.GLOBAL_GROUP);
  }
}
