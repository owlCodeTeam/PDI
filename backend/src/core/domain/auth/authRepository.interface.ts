import { updateUserInput } from "@domain/user/usecases/updateUser.usecase";
import { userEntity } from "./entity/user.entity";

export interface AuthRepositoryInterface {
  getByUsername(username: string): Promise<userEntity>;
  getById(uuid: string): Promise<userEntity>;
  save(user: userEntity): Promise<userEntity>;
  setCheckedAccount(email: string): Promise<void>;
  setNewPassword(newPassword: string, email: string): Promise<void>;
  updateUser(user: updateUserInput, id: string): Promise<void>;
  getAllUsers(): Promise<userEntity[]>;
}
