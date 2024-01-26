export interface UserModel {
  email?: string;
  username: string;
  role: string;
  ratedServers: [{ serverId: string; rating: number }];
  registeredServer: string;
  photo: string;
}
