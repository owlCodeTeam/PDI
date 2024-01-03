import { authGatewayInterface } from "@domain/auth/authGateway.interface";
import { AuthRepositoryInterface } from "../authRepository.interface";

export type GenetareTokenInput = {
  username: string;
  password: string;
};

export class GenerateTokenUsecase {
  constructor(
    readonly repo: AuthRepositoryInterface,
    readonly gateway: authGatewayInterface,
  ) {}

  public async execute(input: GenetareTokenInput) {
    const user = await this.repo.getByUsername(input.username);

    if (!user) {
      throw new Error("user_not_found");
    }

    const validatePassord = await this.gateway.validatePassword(user, input.password);
    if (!validatePassord) {
      throw new Error("invalid_password");
    }

    return await this.gateway.tokenGenerate(user);
  }
}
