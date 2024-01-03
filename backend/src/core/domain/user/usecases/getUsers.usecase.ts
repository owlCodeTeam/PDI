import { userEntity } from "../entity/user.entity";
import { userRepositoryInterface } from "../userRepository.interface";

export class getUsersUsecase {
  constructor(readonly repo: userRepositoryInterface) {}
  public async execute(): Promise<userEntity[]> {
    return await this.repo.get();
  }
}
