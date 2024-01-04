import { authGatewayInterface } from "../authGateway.interface";
import { AuthRepositoryInterface } from "../authRepository.interface";

export class verifyAccountUsecase {
  constructor(
    readonly repo: AuthRepositoryInterface,
    readonly gateway: authGatewayInterface,
  ) {}
  public async execute(token: string): Promise<void> {
    const resonse = await this.gateway.tokenDecoding(token);
    await this.repo.setCheckedAccount(resonse.email);
  }
}
