import { Component, OnInit, OnDestroy} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';
import { Router } from '@angular/router';


// team stuff
import { Teams } from '../../../../both/collections/teams.collection';
import { Team } from '../../../../both/models/team.model';

// student stuff for updating the team
import { Students } from '../../../../both/collections/students.collection';
import { Student } from '../../../../both/models/student.model';

import template from './teams-join.component.html';

@Component({
 selector: 'teams-join',
 template
})
export class TeamsJoinComponent implements OnInit, OnDestroy {
  teams: Observable<Team[]>;
  teamsSub: Subscription;
  student: Student;
  studentSub: Subscription;

  constructor(private router: Router) {}

  ngOnInit() {
    this.teams = Teams.find({}).zone();
    this.teamsSub = MeteorObservable.subscribe('teams').subscribe();

    this.studentSub = MeteorObservable.subscribe('student', Meteor.userId()).subscribe(() => {
      MeteorObservable.autorun().subscribe(() => {
        this.student = Students.findOne({studentId: Meteor.userId()});
      });
    });
  }

  ngOnDestroy() {
    this.teamsSub.unsubscribe();
  }

  joinTeam(team:Team) {
    // register yourself as part of selected team
    Students.update(this.student._id, {
      $set: {
        teamId: team._id
      }
    });

    // register teamId as your team
    var currentMembers: string[];
    currentMembers = Teams.findOne(team._id).memberId;
    currentMembers.push(this.student._id);

    Teams.update(team._id, {
      $set: {
        memberId: currentMembers
      }
    });

    //reroute to home
    this.router.navigate(['student/']);
  }
}
