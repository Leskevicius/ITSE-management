import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

export function loadAdmin() {
  var adminAlreadyExists = Meteor.users.find({username: 'admin'}).count;
  console.log("admin acc: ", adminAlreadyExists);
  if (adminAlreadyExists) {
    return;
  } else {
    var Id : string = Accounts.createUser({
      username : 'admin',
      email : 'a@a.a',
      password : 'a'
    });

    Roles.addUsersToRoles(Id, 'admin', Roles.GLOBAL_GROUP);
  }
}
