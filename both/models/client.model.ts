import { CollectionObject } from './collection-object.model';
import { Contact } from './contact.model';

export interface Client extends CollectionObject {
  username: string;
  clientId: string;
  projectId?: string[];
  contact?: Contact;
}
