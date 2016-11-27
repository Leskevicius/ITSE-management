import { ProjectBid } from './project-bid.model';

export interface StudentBid {
  studentId: string;
  bids: ProjectBid[];
}
