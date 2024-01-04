import { AuthSaveDto } from "@infra/http/nestjs/auth/authSave.dto";
import { AuthRepositoryInterface } from "../authRepository.interface";
import { userEntity } from "../entity/user.entity";
import { randomUUID } from "crypto";
import { authGatewayInterface } from "../authGateway.interface";

export class saveUserUsecase {
  constructor(
    readonly gateway: AuthRepositoryInterface,
    readonly repo: authGatewayInterface,
  ) {}
  public async execute(user: AuthSaveDto): Promise<userEntity> {
    const passwordHash = await this.repo.encryptPassword(user.password);
    console.log(passwordHash);
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
