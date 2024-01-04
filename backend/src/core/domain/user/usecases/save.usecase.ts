import { AuthSaveDto } from "@infra/http/nestjs/auth/authSave.dto";
import { AuthRepositoryInterface } from "../../auth/authRepository.interface";
import { userEntity } from "../../auth/entity/user.entity";
import { randomUUID } from "crypto";
import { authGatewayInterface } from "../../auth/authGateway.interface";

export class saveUserUsecase {
  constructor(
    readonly gateway: AuthRepositoryInterface,
    readonly repo: authGatewayInterface,
  ) {}
  public async execute(user: AuthSaveDto): Promise<userEntity> {
    const passwordHash = await this.repo.encryptPassword(user.password);
    const userInput = new userEntity({
      email: user.email,
      name: user.username,
      password: passwordHash,
      cpf: user.cpf,
      uuid: randomUUID(),
    });
    return await this.gateway.save(userInput);
  }
}
