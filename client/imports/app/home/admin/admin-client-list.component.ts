import { Component, OnInit, OnDestroy} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';

import { Clients } from '../../../../../both/collections/clients.collection';
import { Client } from '../../../../../both/models/client.model';

import template from './admin-client-list.component.html';

@Component({
 selector: 'admin-client-list',
 template
})
export class AdminClientListComponent implements OnInit, OnDestroy {
  clients: Observable<Client[]>;
  clientsSub: Subscription;

  ngOnInit() {
    this.clients = Clients.find({}).zone();
    this.clientsSub = MeteorObservable.subscribe('clients').subscribe();
  }

  ngOnDestroy() {
    this.clientsSub.unsubscribe();
  }
}
