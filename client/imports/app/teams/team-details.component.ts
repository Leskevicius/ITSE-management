import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/map';

import { Teams } from '../../../../both/collections/teams.collection';
import { Team } from '../../../../both/models/team.model';

import template from './team-details.component.html';

@Component({
  selector: 'team-details',
  template
})
export class TeamDetailsComponent implements OnInit, OnDestroy {
  teamId: string;
  paramsSub: Subscription;
  team: Team;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.paramsSub = this.route.params
    .map(params => params['teamId'])
    .subscribe(teamId => {
      this.teamId = teamId;

      this.team = Teams.findOne(this.teamId);
    });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }
}
