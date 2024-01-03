import { UserEntity } from "./entity/user.entity";
export type loginInput = {
  email: string;
  password: string;
};
export type updateStudentInput = {
  username: string;
  email: string;
  password: string;
};
export interface userRepositoryInterface {
  signUp(UserEntity: UserEntity): Promise<UserEntity>;
  login(loginInput: loginInput): Promise<boolean>;
  get(): Promise<UserEntity[]>;
  getOne(_id: string): Promise<UserEntity>;
  delete(_id: string): Promise<void>;
  update(updateStudentInput: updateStudentInput, _id: string): Promise<UserEntity>;
}
