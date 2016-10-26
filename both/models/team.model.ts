import { CollectionObject } from './collection-object.model';

export interface Team extends CollectionObject {
  name: string;
  description: string;
  memberId?: string[];
  projectId?: string;
}
