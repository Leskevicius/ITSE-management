import { Pipe, PipeTransform } from '@angular/core';
import { Meteor } from 'meteor/meteor';

import { Project } from '../../../../both/models/project.model';

@Pipe({
  name: 'displayProjectName'
})
export class DisplayProjectNamePipe implements PipeTransform {
  transform(projectId: string, projects: Project[]): string {
    if (!projectId) {
      return 'Z';
    }

    if (!projects) {
      return 'Z'
    }
    for (var i = 0; i < projects.length; i++) {
      if (projects[i]._id === projectId) {
        return projects[i].name;
      }
    }
    return 'Z';
  }
}
