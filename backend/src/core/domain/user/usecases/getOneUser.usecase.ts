import { AuthRepositoryInterface } from "@domain/auth/authRepository.interface";
import { userEntity } from "@domain/auth/entity/user.entity";
import { apiError } from "@infra/http/nestjs/helpers/api-Error.helper";

export class GetOneUserUsecase {
  constructor(readonly repo: AuthRepositoryInterface) {}
  public async execute(_id: string): Promise<userEntity> {
    const user = await this.repo.getById(_id);
    if (!user) {
      throw new apiError("Usuario não encontrado", 404, "user_not_found");
    }
    return user;
  }
}
