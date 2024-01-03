import { userEntity } from "@domain/user/entity/user.entity";
import { loginInput, updateStudentInput, userRepositoryInterface } from "@domain/user/userRepository.interface";

export class userRepository implements userRepositoryInterface {
  save(userEntity: userEntity): Promise<userEntity> {
      
  }
  delete(_id: string): Promise<void> {
      
  }
  get(): Promise<userEntity[]> {
      
  }
  getOne(_id: string): Promise<userEntity> {
      
  }
  login(loginInput: loginInput): Promise<boolean> {
    
  }
}