import { Pipe, PipeTransform } from '@angular/core';
import { Meteor } from 'meteor/meteor';

import { Team } from '../../../../both/models/team.model';

@Pipe({
  name: 'displayTeamName'
})
export class DisplayTeamNamePipe implements PipeTransform {
  transform(teamId: string, teams: Team[]): string {
    if (!teamId) {
      return '';
    }

    if (!teams) {
      return ''
    }

    for (var i = 0; i < teams.length; i++) {
      if (teams[i]._id === teamId) {
        return teams[i].name;
      }
    }
    return '';
  }
}
