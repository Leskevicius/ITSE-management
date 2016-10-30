import { Meteor } from 'meteor/meteor';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';

import { Clients } from '../../../../../both/collections/clients.collection';
import { Client } from '../../../../../both/models/client.model';

import template from './update-client-profile.component.html';

@Component({
  selector: 'update-client-profile',
  template
})
export class UpdateClientProfileComponent implements OnInit, OnDestroy {
  client: Client;
  clientSub: Subscription;


  constructor(private router: Router) {}

  ngOnInit() {
    this.clientSub = MeteorObservable.subscribe('client', Meteor.userId()).subscribe(() => {
      this.client = Clients.findOne({clientId: Meteor.userId()});
    });
  }


  updateClient() {
    Clients.update(this.client._id, {
      $set: {
        'contact.email' : this.client.contact.email,
        'contact.phone' : this.client.contact.phone
      }
    });

    this.router.navigate(['/client/']);
  }

  ngOnDestroy() {
    this.clientSub.unsubscribe();
  }
  // saveParty() {
  //   Parties.update(this.party._id, {
  //     $set: {
  //       name: this.party.name,
  //       description: this.party.description,
  //       location: this.party.location
  //     }
  //   });
  // }
}
