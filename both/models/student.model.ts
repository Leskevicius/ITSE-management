import { CollectionObject } from './collection-object.model';
import { Contact } from './contact.model';

export interface Student extends CollectionObject {
  studentId: string;
  teamId?: string;
  contact?: Contact;

}
