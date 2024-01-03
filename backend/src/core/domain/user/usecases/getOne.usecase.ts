import { UserEntity } from "../entity/user.entity";
import { userRepositoryInterface } from "../userRepository.interface";

export class GetOneUsecase {
  constructor(readonly repo: userRepositoryInterface) {}
  public async getOne(_id: string): Promise<UserEntity> {
    return await this.repo.getOne(_id);
  }
}
