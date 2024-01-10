import { AuthRepositoryInterface } from "@domain/auth/authRepository.interface";
import { userEntity } from "@domain/auth/entity/user.entity";

export class getUsersUsecase {
  constructor(readonly repo: AuthRepositoryInterface) {}
  public async execute(): Promise<userEntity[]> {
    return await this.repo.getAllUsers();
  }
}
