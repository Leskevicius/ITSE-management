import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/map';

import { Clients } from '../../../../../both/collections/clients.collection';
import { Client } from '../../../../../both/models/client.model';

import template from './admin-client-details.component.html';

@Component({
  selector: 'admin-client-details',
  template
})
export class AdminClientDetailsComponent implements OnInit, OnDestroy {
  clientId: string;
  paramsSub: Subscription;
  client: Client;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.paramsSub = this.route.params
    .map(params => params['clientId'])
    .subscribe(clientId => {
      this.clientId = clientId;
      this.client = Clients.findOne(this.clientId);
    });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }
}
