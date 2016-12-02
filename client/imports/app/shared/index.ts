import { DisplayNamePipe } from './display-name.pipe';
import { DisplayProjectNamePipe } from './display-project-name.pipe';
import { DisplayTeamNamePipe } from './display-team-name.pipe';

export const SHARED_DECLARATIONS: any[] = [
  DisplayNamePipe,
  DisplayProjectNamePipe,
  DisplayTeamNamePipe
];
