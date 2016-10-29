import { MongoObservable } from 'meteor-rxjs';

import { Team } from '../models/team.model';

export const Teams = new MongoObservable.Collection<Team>('teams');
