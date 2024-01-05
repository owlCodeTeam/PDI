import { authGatewayInterface } from "@domain/auth/authGateway.interface";
import { AuthRepositoryInterface } from "../authRepository.interface";
export type GenetareTokenInput = {
  username: string;
  password?: string;
};

export class GenerateTokenUsecase {
  constructor(
    readonly repo: AuthRepositoryInterface,
    readonly gateway: authGatewayInterface,
  ) {}

  public async execute(input: GenetareTokenInput) {
    const user = await this.repo.getByUsername(input.username);

    if (!user) {
      throw new Error("Usuario não encontrado");
    }
    if (!input.password) {
      return await this.gateway.tokenGenerate(user);
    }
    const validatePassord = await this.gateway.validatePassword(user, input.password);
    if (!validatePassord) {
      throw new Error("invalid_password");
    }
    if (user.is_verify() === false && validatePassord === true) {
      return await this.gateway.tokenGenerate(user);
    }
    return await this.gateway.tokenGenerate(user);
  }
}
