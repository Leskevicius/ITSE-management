import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Meteor } from 'meteor/meteor';
import { Router } from '@angular/router';

import template from './landing-page.component.html';

@Component({
  selector: 'landing-page',
  template
})
export class LandingPageComponent {}
