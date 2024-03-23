export interface ServerModel {
  server_id?: string;
  user?: string;
  banner?: string;
  name: string;
  website?: string;
  max_level?: string;
  no_votes?: string;
  rating?: number;
  category?: string;
  release_date?: Date;
  player_base?: number;
  languages?: string[];
  focus?: string;
  is_premium?: boolean;
}
