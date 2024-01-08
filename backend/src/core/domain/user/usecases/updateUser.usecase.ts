import { AuthRepositoryInterface } from "@domain/auth/authRepository.interface";
import { apiError } from "@infra/http/nestjs/helpers/api-Error.helper";
export type updateUserInput = {
  username: string;
  email: string;
};
export class UpdateUserUsecase {
  constructor(readonly repo: AuthRepositoryInterface) {}
  async execute(user: updateUserInput, id: string): Promise<void> {
    const userDb = await this.repo.getById(id);
    if (!userDb) {
      throw new apiError("User not found", 404, "not_found");
    }
    await this.repo.updateUser(user, id);
  }
}
