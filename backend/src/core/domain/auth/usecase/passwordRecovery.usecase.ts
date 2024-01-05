import { PasswordrecoveryDto } from "@infra/http/nestjs/auth/passwordRecovery.dto";
import { authGatewayInterface } from "../authGateway.interface";
import { AuthRepositoryInterface } from "../authRepository.interface";
import { userEntity } from "../entity/user.entity";
export class passwordRecoveryUsecase {
  constructor(
    readonly repo: AuthRepositoryInterface,
    readonly gateway: authGatewayInterface,
  ) {}
  public async execute(passwordrecoveryInput: PasswordrecoveryDto): Promise<userEntity> {
    const tokenDecoded = await this.gateway.tokenDecoding(passwordrecoveryInput.token);
    const newPasswordHash = await this.gateway.encryptPassword(passwordrecoveryInput.newPassword);
    await this.repo.setNewPassword(newPasswordHash, tokenDecoded.email);
    const user = await this.repo.getByUsername(tokenDecoded.email);
    if (!user) {
      throw new Error("Usuario não encontrado");
    }
    return user;
  }
}
