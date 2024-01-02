import { userEntity } from "@domain/auth/entity/user.entity.ts";
export type verifyOutput = {
  email: string;
  expiresIn: string;
  iat: number;
};

export interface authGatewayInterface {
  sign(user: userEntity, time: string): Promise<string>;
  Verify(token: string): Promise<verifyOutput>;
}
