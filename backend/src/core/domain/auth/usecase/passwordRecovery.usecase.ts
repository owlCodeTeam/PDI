import { PasswordrecoveryDto } from "@infra/http/nestjs/auth/passwordRecovery.dto";
import { authGatewayInterface } from "../authGateway.interface";
import { AuthRepositoryInterface } from "../authRepository.interface";
import { userEntity } from "../entity/user.entity";
import { apiError } from "@infra/http/nestjs/helpers/api-Error.helper";
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
      throw new apiError("Usuario não encontrado", 404, "not_found");
    }
    return user;
  }
}
