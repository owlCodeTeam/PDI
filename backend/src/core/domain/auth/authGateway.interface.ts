import { userEntity } from "@domain/auth/entity/user.entity";
export type verifyOutput = {
  email: string;
  expiresIn: string;
  iat: number;
};

export interface authGatewayInterface {
  sign(user: userEntity, time: string): Promise<string>;
  Verify(token: string): Promise<verifyOutput>;
  save(user: userEntity): Promise<string>;
  login(oldPassword: string, newPassword: string): Promise<boolean>;
}
