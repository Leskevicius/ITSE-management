import { Accounts } from 'meteor/accounts-base';


export function loadAdmin() {
  var Id : string = Accounts.createUser({
    username : 'admin',
    email : 'a@a.a',
    password : 'a'
  });

  Roles.addUsersToRoles(Id, 'admin', Roles.GLOBAL_GROUP);
}
