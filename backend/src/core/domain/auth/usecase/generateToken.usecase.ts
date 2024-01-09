import { authGatewayInterface } from "@domain/auth/authGateway.interface";
import { AuthRepositoryInterface } from "../authRepository.interface";
import { apiError } from "@infra/http/nestjs/helpers/api-Error.helper";
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
      throw new apiError("Usuario não encontrado", 404, "not_found");
    }
    if (!input.password) {
      return await this.gateway.tokenGenerate(user);
    }
    const validatePassord = await this.gateway.validatePassword(user, input.password);
    if (!validatePassord) {
      throw new apiError("Senha inválida", 401, "not_authorized");
    }
    if (user.is_verify() === false && validatePassord === true) {
      throw new apiError("Sua conta existe mas não está verificada!!!!", 400, "not_authorized");
    }
    return await this.gateway.tokenGenerate(user);
  }
}
