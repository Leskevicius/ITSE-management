import { Component, OnInit, OnDestroy} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';

import { Teams } from '../../../../../both/collections/teams.collection';
import { Team } from '../../../../../both/models/team.model';

import template from './admin-team-bids.component.html';

@Component({
 selector: 'admin-team-bids',
 template
})
export class AdminTeamBidsComponent implements OnInit, OnDestroy {
  teams: Team[];
  teamsSub: Subscription;

  ngOnInit() {
    this.teamsSub = MeteorObservable.subscribe('teams').subscribe(() => {
      this.teams = Teams.find({}).fetch();
    });
  }

  saveBids() {
    for ( var i = 0; i < this.teams.length; i++) {
      Teams.update(this.teams[i]._id, {
        $set : {
          extraBids: this.teams[i].extraBids
        }
      });
    }
  }

  ngOnDestroy() {
    this.teamsSub.unsubscribe();
  }
}
