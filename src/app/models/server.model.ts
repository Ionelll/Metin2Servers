export interface ServerModel {
  _id?: string;
  banner?: string;
  name: string;
  description1?: string;
  description2?: string;
  website?: string;
  maxLevel?: string;
  rating?: number;
  category?: string;
  releaseDate?: Date;
  playerBase?: number;
  languages?: string[];
  focus?: string[];
  isPremium?: boolean;
}
