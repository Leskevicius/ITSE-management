import { CollectionObject } from './collection-object.model';

export interface Project extends CollectionObject {
  name: string;
  description: string;
  clientId?: string;
  features?: string;
  contact: string;
}
