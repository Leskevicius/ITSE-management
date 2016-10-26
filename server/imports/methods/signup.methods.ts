import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

//
// signup() {
//   if (this.signupForm.valid) {
//     this.id = Accounts.createUser({
//       email: this.signupForm.value.email,
//       password: this.signupForm.value.password
//     }, (err) => {
//       if (err) {
//         this.zone.run(() => {
//           this.error = err;
//         });
//       } else {
//         Roles.addUsersToRoles(this.id, 'student', 'default-group');
//         this.router.navigate(['home/student/']);
//       }
//     });
//
//   }
// }


Meteor.methods({
  signup: function (passedEmail: string, passedPassword: string) {
    this.id = Accounts.createUser({
      email: passedEmail,
      password: passedPassword
    });
    Roles.addUsersToRoles(this.id, 'student', 'default-group');
    console.log(this.id);
  }
});


// Meteor.methods({
//   signup: function (passedEmail: string, passedPassword: string) {
//     this.id = Accounts.createUser({
//       email: passedEmail,
//       password: passedPassword
//     }, (err) => {
//       if (err) {
//           throw err;
//       } else {
//         //success
//         Roles.addUsersToRoles(this.id, 'student', 'default-group');
//       }
//     });
//   }
// });
