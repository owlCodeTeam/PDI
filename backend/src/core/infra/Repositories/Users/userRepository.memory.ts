import { UserEntity } from "@domain/user/entity/user.entity";
import { loginInput, updateStudentInput, userRepositoryInterface } from "@domain/user/userRepository.interface";

export class userRepository implements userRepositoryInterface {
  signUp(UserEntity: UserEntity): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }
  update(updateStudentInput: updateStudentInput, _id: string): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }
  save(UserEntity: UserEntity): Promise<UserEntity> {
    throw new Error("");
  }
  delete(_id: string): Promise<void> {
    throw new Error("");
  }
  get(): Promise<UserEntity[]> {
    throw new Error("");
  }
  getOne(_id: string): Promise<UserEntity> {
    throw new Error("");
  }
  login(loginInput: loginInput): Promise<boolean> {
    throw new Error("");
  }
}
