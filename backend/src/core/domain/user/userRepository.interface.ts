import { userEntity } from "./entity/user.entity";
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
  save(userEntity: userEntity): Promise<userEntity>;
  login(loginInput: loginInput): Promise<boolean>;
  get(): Promise<userEntity[]>;
  getOne(_id: string): Promise<userEntity>;
  delete(_id: string): Promise<void>;
}
