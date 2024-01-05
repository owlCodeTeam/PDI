import { authGatewayInterface } from "@domain/auth/authGateway.interface";
import { AuthRepositoryInterface } from "../authRepository.interface";
import { HttpException, HttpStatus } from "@nestjs/common";
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
      throw new Error("Senha inválida");
    }
    if (user.is_verify() === false && validatePassord === true) {
      throw new HttpException("Sua conta existe mas não está verificada!!!!", HttpStatus.UNAUTHORIZED);
    }
    return await this.gateway.tokenGenerate(user);
  }
}
