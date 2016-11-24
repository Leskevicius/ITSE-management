import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';

import 'rxjs/add/operator/map';

import { Teams } from '../../../../both/collections/teams.collection';
import { Team } from '../../../../both/models/team.model';

import template from './team-home.component.html';

@Component({
  selector: 'team-home',
  template
})
export class TeamHomeComponent implements OnInit, OnDestroy {
  teamId: string;
  paramsSub: Subscription;
  team: Team;
  teamSub: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.paramsSub = this.route.params
    .map(params => params['teamId'])
    .subscribe(teamId => {
      this.teamId = teamId;

      this.teamSub = MeteorObservable.subscribe('team', this.teamId).subscribe(() => {
        this.team = Teams.findOne();
      });
    });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
    this.teamSub.unsubscribe();
  }
}