import { userEntity } from "../entity/user.entity";
import { userRepositoryInterface } from "../userRepository.interface";
export type newUserInput = {
  username: string;
  email: string;
  password: string;
};
export class saveUserUsecase {
  constructor(readonly repo: userRepositoryInterface) {}
  public async execute(user: newUserInput): Promise<userEntity> {
    const input = new userEntity({
      username: user.username,
      email: user.email,
      password: user.password,
    });
    return await this.repo.save(input);
  }
}
