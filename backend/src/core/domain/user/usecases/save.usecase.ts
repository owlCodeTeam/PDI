import { AuthSaveDto } from "@infra/http/nestjs/auth/authSave.dto";
import { AuthRepositoryInterface } from "../../auth/authRepository.interface";
import { userEntity } from "../../auth/entity/user.entity";
import { randomUUID } from "crypto";
import { authGatewayInterface } from "../../auth/authGateway.interface";
import { emailGatewayInterface } from "../emailGateway.interface";
import { apiError } from "@infra/http/nestjs/helpers/api-Error.helper";

export class saveUserUsecase {
  constructor(
    readonly gateway: AuthRepositoryInterface,
    readonly repo: authGatewayInterface,
    readonly emailGateway: emailGatewayInterface,
  ) {}
  public async execute(user: AuthSaveDto): Promise<userEntity> {
    if ((await this.repo.verifyCpf(user.cpf)) === false) {
      throw new apiError("CPF inválido", 400, "invalid_item");
    }
    const passwordHash = await this.repo.encryptPassword(user.password);
    const userInput = new userEntity({
      email: user.email,
      name: user.username,
      password: passwordHash,
      cpf: user.cpf,
      uuid: randomUUID(),
    });
    const token = await this.repo.tokenGenerate(userInput);
    const emailContent = {
      from: process.env.EMAILADMIN,
      to: user.email,
      subject: "Verificação de conta",
      text: "Clique no botão abaixo e será redirecionado para o site.",
      html: `<a href='http://localhost:9000/#/verify-account/${user.email}/${token}'><button style='font-size: 16px; font-weight: 600; padding: 1vh 1vw; cursor: pointer;border-radius: 1vh; color: #fff; background-color: #303f9f; border: none;'>Clique aqui!</button></a>`,
    };
    await this.emailGateway.send(emailContent);
    return await this.gateway.save(userInput);
  }
}
