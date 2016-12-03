import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';

import 'rxjs/add/operator/map';

import { Teams } from '../../../../both/collections/teams.collection';
import { Team } from '../../../../both/models/team.model';

import { Projects } from '../../../../both/collections/projects.collection';
import { Project } from '../../../../both/models/project.model';

import { ProjectBid } from '../../../../both/models/project-bid.model';
import { StudentBid } from '../../../../both/models/student-bid.model';

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
  teamBids: ProjectBid[] = [];
  projectSub: Subscription;
  topProject: Project;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.paramsSub = this.route.params
    .map(params => params['teamId'])
    .subscribe(teamId => {
      this.teamId = teamId;

      this.teamSub = MeteorObservable.subscribe('team', this.teamId).subscribe(() => {
        this.team = Teams.findOne();
        this.populateTeamBids();

        this.projectSub = MeteorObservable.subscribe('projects').subscribe(() => {
          this.topProject = Projects.findOne(this.teamBids[0].projectId);
          if (this.topProject) {
            console.log("topProject exists...");
          } else {
            console.log("topProject does not exist...");
          }
        });
      });
    });
  }

  populateTeamBids() {
    var studentBids: StudentBid[] = this.team.projectBids;
    for (var i = 0; i < studentBids.length; i++) {
      var tempProjectBids: ProjectBid[] = studentBids[i].bids;
      for (var j = 0; j < tempProjectBids.length; j++) {
        var found: Boolean = false;
        for (var k = 0; k < this.teamBids.length; k++) {
          if (this.teamBids[k].projectId == tempProjectBids[j].projectId) {
            found = true;
            this.teamBids[k].bid = this.teamBids[k].bid + tempProjectBids[j].bid;
          }
        }
        if (!found) {
          var tempProjectBid: ProjectBid = {
            projectId: tempProjectBids[j].projectId,
            bid: tempProjectBids[j].bid
          }
          this.teamBids.push(tempProjectBid);
        }
      }
    }

    for ( var i = 0; i < this.team.extraProjectBids.length; i++) {
      for ( var j = 0; j < this.teamBids.length; j++) {
        if (this.team.extraProjectBids[i].projectId === this.teamBids[j].projectId) {
          this.teamBids[j].bid = this.team.extraProjectBids[i].bid;
        }
      }
    }

    this.teamBids.sort(function(a,b) {
      if (a.bid < b.bid) {
        return 1
      } else if (a.bid === b.bid) {
        return 0;
      } else return -1;
    });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
    this.teamSub.unsubscribe();
    this.projectSub.unsubscribe();
  }
}
