require("dotenv").config();
import { authGatewayInterface } from "@domain/auth/authGateway.interface";
import { sign, verify } from "jsonwebtoken";
import { userEntity } from "@domain/auth/entity/user.entity";
import { DataSource } from "typeorm";
import { UserModel } from "./database/models/User.model";
import * as bcrypt from "bcrypt";
import { apiError } from "@infra/http/nestjs/helpers/api-Error.helper";
export type verifyOutput = {
  email: string;
  expiresIn: string;
  iat: number;
};
export class AuthGatewayLocal implements authGatewayInterface {
  private key = process.env.AUTH_SECRET;

  constructor(readonly dataSource: DataSource) {}

  async tokenGenerate(user: userEntity): Promise<string> {
    const token = sign(user.payloadToken(), this.key);
    return token;
  }

  async validatePassword(user: userEntity, password: string): Promise<boolean> {
    const userModel = await this.dataSource
      .getRepository(UserModel)
      .createQueryBuilder()
      .where("uuid = :uuid", { uuid: user.uuid() })
      .getOne();
    return await bcrypt.compare(password, userModel.password);
  }

  async tokenDecoding(token: string): Promise<verifyOutput> {
    try {
      const payload = verify(token, this.key);
      return payload;
    } catch (error) {
      throw new apiError(error, 400, "token_error");
    }
  }
  async encryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);
    return passwordHash;
  }
  async verifyCpf(cpf: string): Promise<boolean> {
    if (typeof cpf !== "string") return false;
    cpf = cpf.replace(/[\s.-]*/gim, "");
    if (
      !cpf ||
      cpf.length != 11 ||
      cpf == "00000000000" ||
      cpf == "11111111111" ||
      cpf == "22222222222" ||
      cpf == "33333333333" ||
      cpf == "44444444444" ||
      cpf == "55555555555" ||
      cpf == "66666666666" ||
      cpf == "77777777777" ||
      cpf == "88888888888" ||
      cpf == "99999999999"
    ) {
      return false;
    }
    let soma = 0;
    let resto;
    for (let i = 1; i <= 9; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(cpf.substring(9, 10))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(cpf.substring(10, 11))) return false;
    return true;
  }
}
