import { Meteor } from 'meteor/meteor';
import { Teams } from '../../../both/collections/teams.collection';

Meteor.publish('teams', () => Teams.find());
