import { CollectionObject } from './collection-object.model';

export interface Team extends CollectionObject {
  name: string;
  owner?: string;
  memberId?: string[];
  projectId?: string;
}
