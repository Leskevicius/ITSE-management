import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';

import 'rxjs/add/operator/map';

import { Teams } from '../../../../both/collections/teams.collection';
import { Team } from '../../../../both/models/team.model';

import { Projects } from '../../../../both/collections/projects.collection';
import { Project } from '../../../../both/models/project.model';

import { ProjectBid } from '../../../../both/models/project-bid.model';
import { ProjectRecBid } from '../../../../both/models/project-rec-bid.model';
import { StudentBid } from '../../../../both/models/student-bid.model';

import template from './team-recommendation.component.html';

@Component({
  selector: 'team-recommendation',
  template
})
export class TeamRecComponent implements OnInit, OnDestroy {
  teamId: string;
  paramsSub: Subscription;
  team: Team;
  teamSub: Subscription;
  teamBids: ProjectRecBid[] = [];
  projectSub: Subscription;
  topProject: Project;
  projects: Project[];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.paramsSub = this.route.params
    .map(params => params['teamId'])
    .subscribe(teamId => {
      this.teamId = teamId;

      this.teamSub = MeteorObservable.subscribe('team', this.teamId).subscribe(() => {
        this.team = Teams.findOne();


        this.projectSub = MeteorObservable.subscribe('projects').subscribe(() => {
          this.projects = Projects.find({}).fetch();
          this.populateTeamBids();
          this.topProject = Projects.findOne(this.teamBids[0].projectId);


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


  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
    this.teamSub.unsubscribe();
    this.projectSub.unsubscribe();
  }
}
