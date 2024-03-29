import { ServerModel } from './server.model';

export interface UserModel {
  email?: string;
  servers?: ServerModel[];
  ratings?: { value: number; server: string }[];
}
