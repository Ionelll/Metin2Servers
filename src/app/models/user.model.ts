import { ServerModel } from './server.model';

export interface UserModel {
  email?: string;
  servers?: ServerModel[];
}
