import * as bcrypt from "bcrypt";
import { authGatewayInterface } from "@domain/auth/authGateway.interface";
import { sign, verify } from "jsonwebtoken";
import { userEntity } from "@domain/auth/entity/user.entity";
export type verifyOutput = {
  email: string;
  expiresIn: string;
  iat: number;
};
export class authGatewayLocal implements authGatewayInterface {
  constructor() {}
  private key = process.env.SECRET;
  sign(username: string, password: string, time: string): Promise<string> {
    const token = sign(
      {
        email: username,
        expiresIn: time,
      },
      this.key,
    );
    return token;
  }
  async Verify(token: string): Promise<verifyOutput> {
    return (await verify(token, this.key)) as verifyOutput;
  }
  async login(oldPassword: string, newPassword: string): Promise<boolean> {
    return await bcrypt.compare(newPassword, oldPassword);
  }
  async save(user: userEntity): Promise<string> {
    const salt = bcrypt.genSalt(12);
    const passwordHash = bcrypt.hash(user.password, salt);
    return passwordHash;
  }
}
