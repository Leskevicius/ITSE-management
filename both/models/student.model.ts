import { CollectionObject } from './collection-object.model';
import { Contact } from './contact.model';
import { ProjectBid } from './project-bid.model';

export interface Student extends CollectionObject {
  username: string;
  studentId: string;
  teamId?: string;
  contact?: Contact;
  bids?: ProjectBid[];
}
