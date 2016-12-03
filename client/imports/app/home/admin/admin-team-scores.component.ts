import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';

import { Teams } from '../../../../../both/collections/teams.collection';
import { Team } from '../../../../../both/models/team.model';

import { Projects } from '../../../../../both/collections/projects.collection';
import { Project } from '../../../../../both/models/project.model';

import { ProjectBid } from '../../../../../both/models/project-bid.model';
import { StudentBid } from '../../../../../both/models/student-bid.model';


import template from './admin-team-scores.component.html';
declare var $:JQueryStatic;

@Component({
    selector: 'admin-team-scores',
    template
})
export class AdminTeamScoresComponent implements AfterViewInit, OnInit, OnDestroy{
  teams: Team[];
  teamsSub: Subscription;
  projects: Project[];
  projectsSub: Subscription;
  projectBidMapping: any[];
  projectBidMap: any[];
  tableCols : number;
  currPage: number = 0;
  currStep: number = 3;

  ngAfterViewInit() {

  }

  ngOnInit() {
    this.teamsSub = MeteorObservable.subscribe('teams').subscribe(() => {
      this.teams = Teams.find().fetch();
      this.projectsSub = MeteorObservable.subscribe('projects').subscribe(() => {
        this.projects = Projects.find().fetch();
        this.tableCols = this.projects.length + 1;
        this.populateMap();
        this.projectBidMap = this.getMappingFor(this.projectBidMapping, this.currPage, this.currStep);
      });
    });
  }

  ngOnDestroy() {
    this.projectsSub.unsubscribe();
    this.teamsSub.unsubscribe();
  }

  populateMap() {
    var tempAllTeamBids : any[] = [];
    var allTeamBids : any[] = [];
    for (var j = 0; j < this.teams.length; j++) {
      var currTeamBids : ProjectBid[] = this.populateTeamBids(j);
      tempAllTeamBids.push(currTeamBids);
    }

    for (var i = 0; i < this.projects.length; i++) {
      var bids : number[] = [];
      for (var j = 0; j < tempAllTeamBids.length; j++) {
        var bid : number = 0;
        for (var z = 0; z < tempAllTeamBids[j].length; z++) {
          if (tempAllTeamBids[j][z].projectId === this.projects[i]._id) {
            bid = tempAllTeamBids[j][z].bid;
          }
        }
        if (bid !== 0) {
          bids.push(bid);
        }
      }
      allTeamBids.push({
        projectId: this.projects[i]._id,
        bids: bids
      });
    }
    this.projectBidMapping = allTeamBids;
  }

  getMappingFor(map: any[], page: number, step: number): any[] {
    var newMap: any[] = [];
    var mapSize: number = map.length;
    var mapDepth: number;
    if (mapSize > 0) {
      mapDepth = map[0].bids.length;
    } else {
      return [];
    }

    if (page * step + step > mapSize) {
      for (var i = mapSize - step; i < mapSize; i++) {
        newMap.push(map[i]);
      }
    } else if (page * step < 0) {
      for (var i = 0; i < step; i++) {
        newMap.push(map[i]);
      }
    } else {
      for (var i = page * step; i < page * step + step; i++) {
        newMap.push(map[i]);
      }
    }
    return newMap;
  }

  prev() {
    if (this.currPage <= 0) {
      this.currPage = 0;
    } else {
      this.currPage--;
      this.projectBidMap = this.getMappingFor(this.projectBidMapping, this.currPage, this.currStep);
    }
    console.log(this.currPage);
  }

  next() {
    if (this.currPage >= (this.projects.length / this.currStep)) {
      this.currPage = (this.projects.length / this.currStep);
    } else {
      this.currPage++;
      this.projectBidMap = this.getMappingFor(this.projectBidMapping, this.currPage, this.currStep);
    }
    console.log(this.currPage);
  }

  populateTeamBids(indexInTeam: number): ProjectBid[] {
    var teamBids: ProjectBid[] = [];
    var studentBids: StudentBid[] = this.teams[indexInTeam].projectBids;
    for (var i = 0; i < studentBids.length; i++) {
      var tempProjectBids: ProjectBid[] = studentBids[i].bids;
      for (var j = 0; j < tempProjectBids.length; j++) {
        var found: Boolean = false;
        for (var k = 0; k < teamBids.length; k++) {
          if (teamBids[k].projectId == tempProjectBids[j].projectId) {
            found = true;
            teamBids[k].bid = teamBids[k].bid + tempProjectBids[j].bid;
          }
        }
        if (!found) {
          var tempProjectBid: ProjectBid = {
            projectId: tempProjectBids[j].projectId,
            bid: tempProjectBids[j].bid
          }
          teamBids.push(tempProjectBid);
        }
      }
    }
    return teamBids;
  }
}
