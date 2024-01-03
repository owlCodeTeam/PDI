import { userEntity } from "@domain/auth/entity/user.entity";
export type verifyOutput = {
  email: string;
  expiresIn: string;
  iat: number;
};

export interface authGatewayInterface {
  sign(username: string, password: string, time: string): Promise<string>;
  Verify(token: string): Promise<verifyOutput>;
  save(user: userEntity): Promise<string>;
  login(oldPassword: string, newPassword: string): Promise<boolean>;
}
