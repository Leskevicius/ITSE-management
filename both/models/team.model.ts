import { CollectionObject } from './collection-object.model';
import { StudentBid } from './student-bid.model';
import { ProjectBid } from './project-bid.model';

export interface Team extends CollectionObject {
  name: string;
  owner?: string;
  memberId?: string[];
  projectId?: string;
  projectBids?: StudentBid[];
  extraBids?: number;
  extraProjectBids?: ProjectBid[];
}
