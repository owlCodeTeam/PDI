import { UserEntity } from "./entity/user.entity";

export interface AuthRepositoryInterface {
  getByUsername(username: string): Promise<UserEntity>;
}
