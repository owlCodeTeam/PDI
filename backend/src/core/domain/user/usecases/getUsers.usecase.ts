import { userEntity } from "../entity/user.entity";
import { userRepositoryInterface } from "../userRepository.interface";

export class getUsersUsecase {
  constructor(readonly repo: userRepositoryInterface) {}
  public async ecxecute(): Promise<userEntity[]> {
    return await this.repo.get();
  }
}
