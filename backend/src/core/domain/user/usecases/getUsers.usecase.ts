import { UserEntity } from "../entity/user.entity";
import { userRepositoryInterface } from "../userRepository.interface";

export class getUsersUsecase {
  constructor(readonly repo: userRepositoryInterface) {}
  public async ecxecute(): Promise<UserEntity[]> {
    return await this.repo.get();
  }
}
