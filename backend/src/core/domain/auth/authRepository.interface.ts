import { userEntity } from "./entity/user.entity";

export interface AuthRepositoryInterface {
  getByUsername(username: string): Promise<userEntity>;
  save(user: userEntity): Promise<userEntity>;
}
