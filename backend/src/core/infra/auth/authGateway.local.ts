import { authGatewayInterface } from "@core/domain/auth/authGateway.interface.ts";
import { sign, verify } from "jsonwebtoken";
import { userEntity } from "@core/domain/auth/entity/user.entity.ts";
export type verifyOutput = {
  email: string;
  expiresIn: string;
  iat: number;
};
export class authGatewayLocal implements authGatewayInterface {
  constructor(readonly key: string) {}
  sign(user: userEntity, time: string): Promise<string> {
    console.log(this.key);
    const token = sign(
      {
        email: user.email(),
        expiresIn: time,
      },
      this.key,
    );
    return token;
  }
  async Verify(token: string): Promise<verifyOutput> {
    return (await verify(token, this.key)) as verifyOutput;
  }
}
