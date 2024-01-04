require("dotenv").config();
import { authGatewayInterface } from "@domain/auth/authGateway.interface";
import { sign, verify } from "jsonwebtoken";
import { userEntity } from "@domain/auth/entity/user.entity";
import { DataSource } from "typeorm";
import { UserModel } from "./database/models/User.model";
import * as bcrypt from "bcrypt";
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
      throw new Error(error);
    }
  }
  async encryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);
    return passwordHash;
  }
}
