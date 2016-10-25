import { Projects } from '../../../both/collections/projects.collection';
import { Project } from '../../../both/models/project.model';

export function loadProjects() {
  if (Projects.find().cursor.count() === 0) {
    const projects: Project[] = [{
      name: 'Dubstep-Free Zone',
      description: 'Can we please just for an evening not listen to dubstep.'
    }, {
      name: 'All dubstep all the time',
      description: 'Get it on!'
    }, {
      name: 'Savage lounging',
      description: 'Leisure suit required. And only fiercest manners.'
    }];

    projects.forEach((project: Project) => Projects.insert(project));
  }
}
