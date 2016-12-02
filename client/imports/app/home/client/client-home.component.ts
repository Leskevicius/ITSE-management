import { Component, OnInit } from '@angular/core';
import { Meteor } from 'meteor/meteor';
import { Router } from '@angular/router';

import template from './client-home.component.html';

@Component({
  selector: 'client-home',
  template
})
export class ClientHomeComponent implements OnInit {
  amI: boolean = false;

  ngOnInit() {

  }

}
