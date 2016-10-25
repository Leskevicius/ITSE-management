import { MongoObservable } from 'meteor-rxjs';

import { Project } from '../models/project.model';

export const Projects = new MongoObservable.Collection<Project>('projects');
