import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';
import { Router } from '@angular/router';



import 'rxjs/add/operator/map';

import { Clients } from '../../../../../both/collections/clients.collection';
import { Client } from '../../../../../both/models/client.model';

import { Projects } from '../../../../../both/collections/projects.collection';
import { Project } from '../../../../../both/models/project.model';

import template from './admin-client-details.component.html';

@Component({
  selector: 'admin-client-details',
  template
})
export class AdminClientDetailsComponent implements OnInit, OnDestroy {
  clientId: string;
  paramsSub: Subscription;
  client: Client;
  projects: Project[];
  projectsSub: Subscription;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.paramsSub = this.route.params
    .map(params => params['clientId'])
    .subscribe(clientId => {
      this.clientId = clientId;
      this.client = Clients.findOne(this.clientId);

      console.log(this.client.projectId.length);

      this.projectsSub = MeteorObservable.subscribe('projects').subscribe(() => {
        this.projects = Projects.find().fetch();
      });
    });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
    this.projectsSub.unsubscribe();
  }

  updateClient() {
    Clients.update(this.client._id, {
      $set: {
        'contact.email' : this.client.contact.email,
        'contact.phone' : this.client.contact.phone
      }
    });

    this.router.navigate(['/admin']);
  }
}
