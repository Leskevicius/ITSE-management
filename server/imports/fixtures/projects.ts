import { Projects } from '../../../both/collections/projects.collection';
import { Project } from '../../../both/models/project.model';

export function loadProjects() {
  if (Projects.find().cursor.count() === 0) {
    const projects: Project[] = [{
      name: 'Dubstep-Free Zone',
      description: 'Can we please just for an evening not listen to dubstep.',
      features: 'features are here...',
      contact: 'call me 305 305 3053'
    }, {
      name: 'All dubstep all the time',
      description: 'Get it on!',
      features: 'features are here...',
      contact: 'call me 305 305 3053'
    }, {
      name: 'Savage lounging',
      description: 'Leisure suit required. And only fiercest manners.',
      features: 'features are here...',
      contact: 'call me 305 305 3053'
    }];

    projects.forEach((project: Project) => Projects.insert(project));

    for (var i = 0; i < 25; i++) {
      Projects.insert({
        name: Fake.sentence(10),
        description: Fake.sentence(100),
        features: Fake.sentence(75),
        contact: Fake.sentence(15)
      });
    }
  }
}
