import { emailGatewayInterface } from "@domain/user/emailGateway.interface";
import { authGatewayInterface } from "../authGateway.interface";
import { AuthRepositoryInterface } from "../authRepository.interface";
export class ResendTokenUsecase {
  constructor(
    readonly repo: AuthRepositoryInterface,
    readonly gateway: authGatewayInterface,
    readonly emailGateway?: emailGatewayInterface,
  ) {}
  public async execute(email: string): Promise<string> {
    const user = await this.repo.getByUsername(email);
    if (user) {
      const token = await this.gateway.tokenGenerate(user);
      return token;
    }
    return;
  }
}
