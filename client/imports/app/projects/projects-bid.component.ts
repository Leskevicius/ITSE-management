import { Component, OnInit, OnDestroy} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';
import { DragulaService } from 'ng2-dragula/components/dragula.provider';
import { Router } from '@angular/router';

import { Projects } from '../../../../both/collections/projects.collection';
import { Project } from '../../../../both/models/project.model';

import { Students } from '../../../../both/collections/students.collection';
import { Student } from '../../../../both/models/student.model';

import { Teams } from '../../../../both/collections/teams.collection';
import { Team } from '../../../../both/models/Team.model';
import { StudentBid } from '../../../../both/models/student-bid.model';

import { ProjectBid } from '../../../../both/models/project-bid.model';

import template from './projects-bid.component.html';
import style from './projects-bid.component.scss';

@Component({
 selector: 'project-bid',
 template,
 styles: [style]
})
export class ProjectsBidComponent implements OnInit, OnDestroy {
  projects: Observable<Project[]>;
  projectsSub: Subscription;
  student: Student;
  studentSub: Subscription;
  projectBids: ProjectBid[] = [];
  team: Team;
  teamSub: Subscription;

  constructor(private dragulaService: DragulaService, private router: Router) {

    dragulaService.drag.subscribe((value) => {
      console.log(`drag: ${value[0]}`);
      this.onDrag(value.slice(1));
    });
    dragulaService.drop.subscribe((value) => {
      console.log(`drop: ${value[0]}`);
      this.onDrop(value.slice(1));
    });
    dragulaService.over.subscribe((value) => {
      console.log(`over: ${value[0]}`);
      this.onOver(value.slice(1));
    });
    dragulaService.out.subscribe((value) => {
      console.log(`out: ${value[0]}`);
      this.onOut(value.slice(1));
    });
  }

  private onDrag(args) {
    let [e, el] = args;
    // do something
  }

  private onDrop(args) {
    let [e, el] = args;
    // do something
    for (var j = 0; j < this.projectBids.length; j++) {
      console.log("bids[", j, "] = {", this.projectBids[j].projectId, ", ", this.projectBids[j].bid, "}");
    }
  }

  private onOver(args) {
    let [e, el, container] = args;
    // do something
  }

  private onOut(args) {
    let [e, el, container] = args;
    // do something
  }

  ngOnInit() {
    this.projects = Projects.find({}).zone();
    this.projectsSub = MeteorObservable.subscribe('projects').subscribe();
    this.studentSub = MeteorObservable.subscribe('student', Meteor.userId()).subscribe(() => {

        this.student = Students.findOne({studentId: Meteor.userId()});
        if (this.student) {
          console.log("student found...");
          this.consistencyCheck();
        }
        else
          console.log("student not found...");

        this.teamSub = MeteorObservable.subscribe('team', this.student.teamId).subscribe(() => {
          this.team = Teams.findOne();
        });
    });
  }

  consistencyCheck(): Boolean {
    //get # of bids of current user
    var user_bids_len = this.student.bids.length;
    console.log("user_bids_len: ", user_bids_len);

    var nr_projects = Projects.find().cursor.count();
    console.log("nr_projects: ", nr_projects);


    if (user_bids_len != nr_projects) {
      console.log("inconsistent!");
      var bidArray: ProjectBid[];
      bidArray = Projects.find().cursor.map(function(currDoc) {
        var pb: ProjectBid;
        pb = {
          projectId: currDoc._id,
          bid: 0
        }
        return pb;
      });

      for (var i = 0; i < bidArray.length; i++) {
        bidArray[i].bid = i + 1;
      }

      Students.update(this.student._id, {
        $set: {
          bids: bidArray
        }
      });

      this.projectBids = bidArray;
      for (var j = 0; j < this.projectBids.length; j++) {
        console.log("bids[", j, "] = {", this.projectBids[j].projectId, ", ", this.projectBids[j].bid, "}");
      }
      return false;

    } else {
      console.log("consistent!");
      this.projectBids = this.student.bids;
      for (var j = 0; j < this.projectBids.length; j++) {
        console.log("bids[", j, "] = {", this.projectBids[j].projectId, ", ", this.projectBids[j].bid, "}");
      }
      return true;
    }
  }

  saveBids() {
    // save current ranking of projects
    this.projectBids;
    for (var i = 0; i < this.projectBids.length; i++) {
      this.projectBids[i].bid = this.projectBids.length - i;
    }

    Students.update(this.student._id, {
      $set : {
        bids: this.projectBids
      }
    });

    // make sure team database reflects the change
    var inDataBase: boolean = false;
    var currentBid: ProjectBid[];
    var studentBids: StudentBid[] = this.team.projectBids;
    for (var i = 0; i < studentBids.length; i++) {
      if (studentBids[i].studentId == this.student.studentId) {
        studentBids[i].bids = this.projectBids;
        inDataBase = true;
      }
    }

    if (!inDataBase) {
      var studentBid: StudentBid = {
        studentId: this.student.studentId,
        bids: this.projectBids
      }
      studentBids.push(studentBid);
    }

    Teams.update(this.student.teamId, {
      $set : {
        projectBids: studentBids
      }
    });

    this.router.navigate(['student/']);
  }

  ngOnDestroy() {
    this.projectsSub.unsubscribe();
  }
}
