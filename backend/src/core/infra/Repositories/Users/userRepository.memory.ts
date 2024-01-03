import { userEntity } from "@domain/user/entity/user.entity";
import { loginInput, updateStudentInput, userRepositoryInterface } from "@domain/user/userRepository.interface";

export class userRepository implements userRepositoryInterface {
  signUp(userEntity: userEntity): Promise<userEntity> {
    throw new Error("Method not implemented.");
  }
  update(updateStudentInput: updateStudentInput, _id: string): Promise<userEntity> {
    throw new Error("Method not implemented.");
  }
  save(userEntity: userEntity): Promise<userEntity> {
    throw new Error("");
  }
  delete(_id: string): Promise<void> {
    throw new Error("");
  }
  get(): Promise<userEntity[]> {
    throw new Error("");
  }
  getOne(_id: string): Promise<userEntity> {
    throw new Error("");
  }
  login(loginInput: loginInput): Promise<boolean> {
    throw new Error("");
  }
}
