import { userEntity } from "../entity/user.entity";
import { userRepositoryInterface } from "../userRepository.interface";

export class GetOneUsecase {
  constructor(readonly repo: userRepositoryInterface) {}
  public async getOne(_id: string): Promise<userEntity> {
    return await this.repo.getOne(_id);
  }
}
