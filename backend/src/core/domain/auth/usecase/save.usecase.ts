import { AuthSaveDto } from "@infra/http/nestjs/auth/authSave.dto";
import { AuthRepositoryInterface } from "../authRepository.interface";
import { userEntity } from "../entity/user.entity";
import { randomUUID } from "crypto";

export class saveUserUsecase {
  constructor(readonly gateway: AuthRepositoryInterface) {}
  public async execute(user: AuthSaveDto): Promise<userEntity> {
    const userInput = new userEntity({
      email: user.email,
      name: user.username,
      password: user.password,
      cpf: user.cpf,
      uuid: randomUUID(),
    });
    console.log(await this.gateway.save(userInput));
    return await this.gateway.save(userInput);
  }
}
