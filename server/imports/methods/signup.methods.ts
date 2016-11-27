import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import { Clients } from '../../../both/collections/clients.collection';
import { Students } from '../../../both/collections/students.collection';
import { Projects } from '../../../both/collections/projects.collection';
import { Project } from '../../../both/models/project.model';

import { ProjectBid } from '../../../both/models/project-bid.model';


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
      var bidArray: ProjectBid[];
      bidArray = Projects.find().cursor.map(function(currDoc) {
          var pb: ProjectBid;
          pb = {
            projectId: currDoc._id,
            bid: 0
          }
          return pb;
      });

      for (var i = 0; i < bidArray.length; i++) {
        bidArray[i].bid = bidArray.length - i;
      }

      Students.insert({
        studentId: this.id,
        contact: {email: '', phone: ''},
        bids: bidArray
      });
      console.log('created Students entry');
    }
  }
});
