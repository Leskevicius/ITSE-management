import { Meteor } from 'meteor/meteor';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Clients } from '../../../../../both/collections/clients.collection';

import template from './update-client-profile.html';

@Component({
  selector: 'client-profile-form',
  template
})
export class UpdateClientProfileComponent implements OnInit {
  updateForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.updateForm = this.formBuilder.group({
      email: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  addProject(): void {
    if (this.updateForm.valid) {
      Clients.insert({
        name: this.updateForm.value.name,
        description: this.updateForm.value.description,
        clientId: Meteor.userId(),
        features: this.updateForm.value.features,
        contact: this.updateForm.value.contact
      });

      this.updateForm.reset();
      this.router.navigate(['client/']);
    }
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
