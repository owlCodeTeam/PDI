import { userEntity } from "../entity/user.entity";
import { userRepositoryInterface } from "../userRepository.interface";

export class GetOneUserUsecase {
  constructor(readonly repo: userRepositoryInterface) {}
  public async execute(_id: string): Promise<userEntity> {
    return await this.repo.getOne(_id);
  }
}
