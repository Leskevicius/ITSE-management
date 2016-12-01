import { Component, OnInit, OnDestroy} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';

import { Teams } from '../../../../../both/collections/teams.collection';
import { Team } from '../../../../../both/models/team.model';

import template from './admin-teams-list.component.html';

@Component({
 selector: 'admin-team-list',
 template
})
export class AdminTeamsListComponent implements OnInit, OnDestroy {
  teams: Observable<Team[]>;
  teamsSub: Subscription;

  ngOnInit() {
    this.teams = Teams.find({}).zone();
    this.teamsSub = MeteorObservable.subscribe('teams').subscribe();
  }

  ngOnDestroy() {
    this.teamsSub.unsubscribe();
  }
}
