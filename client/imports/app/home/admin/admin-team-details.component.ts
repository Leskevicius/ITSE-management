import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';

import 'rxjs/add/operator/map';

import { Teams } from '../../../../../both/collections/teams.collection';
import { Team } from '../../../../../both/models/team.model';

import { Projects } from '../../../../../both/collections/projects.collection';
import { Project } from '../../../../../both/models/project.model';

import { ProjectBid } from '../../../../../both/models/project-bid.model';
import { ProjectRecBid } from '../../../../../both/models/project-rec-bid.model';
import { StudentBid } from '../../../../../both/models/student-bid.model';


import template from './admin-team-details.component.html';

@Component({
  selector: 'admin-team-details',
  template
})
export class AdminTeamDetailsComponent implements OnInit, OnDestroy {
  teamId: string;
  paramsSub: Subscription;
  team: Team;
  teamBids: ProjectRecBid[] = [];
  projectSub: Subscription;
  projects: Project[];
  teamsSub: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.paramsSub = this.route.params
    .map(params => params['teamId'])
    .subscribe(teamId => {
      this.teamId = teamId;
      this.teamsSub = MeteorObservable.subscribe('teams').subscribe(() => {
        this.team = Teams.findOne(this.teamId);
        console.log(this.teamId);
        if (this.team) {
          console.log("team found");
        } else {
          console.log("team not found");
        }
        this.projectSub = MeteorObservable.subscribe('projects').subscribe(() => {
          this.projects = Projects.find({}).fetch();
          this.populateTeamBids();
        });
      });
    });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
    this.teamsSub.unsubscribe();
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
          var projectName: string;
          for (var z = 0; z < this.projects.length; z++) {
            if (this.projects[z]._id == tempProjectBids[j].projectId) {
              projectName = this.projects[z].name;
            }
          }
          var tempProjectBid: ProjectRecBid = {
            projectId: tempProjectBids[j].projectId,
            bid: tempProjectBids[j].bid,
            projectName: projectName
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
}
