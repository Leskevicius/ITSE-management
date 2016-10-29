import { Component, OnInit, OnDestroy } from '@angular/core';
import { Meteor } from 'meteor/meteor';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';

import { Teams } from '../../../../../both/collections/teams.collection';
import { Team } from '../../../../../both/models/team.model';

import template from './student-home.component.html';

@Component({
  selector: 'student-home',
  template
})
export class StudentHomeComponent implements OnInit, OnDestroy {
  // amI: boolean = false;
  //
  // checkIt() {
  //   this.amI = Roles.userIsInRole(Meteor.userId(),
  //                           ['student'], 'default-group');
  // }
  teams: Observable<Team[]>;
  teamsSub: Subscription;


  ngOnInit() {
    this.teams = Teams.find({}).zone();
    this.teamsSub = MeteorObservable.subscribe('teams').subscribe();
  }

  ownsTeam() {
    var query = { owner: Meteor.userId() }
    var found = Teams.find({});
    console.log(found);
    console.log('done');
  }

  ngOnDestroy() {
    this.teamsSub.unsubscribe();
  }

}
