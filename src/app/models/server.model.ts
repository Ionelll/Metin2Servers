export interface ServerModel {
  banner?: string;
  name: string;
  description?: string;
  website?: string;
  maxLevel?: string;
  rating?: number;
  category?: string;
  startDate?: string;
  comments?: {
    username: string;
    userPhoto: string;
    comment: string;
  };
}
