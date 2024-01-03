import { UserEntity } from "@domain/auth/entity/user.entity";
export type verifyOutput = {
  email: string;
  expiresIn: string;
  iat: number;
};

export interface authGatewayInterface {
  tokenGenerate(user: UserEntity): Promise<string>;
  validatePassword(user: UserEntity, password: string): Promise<boolean>;
  // save(user: UserEntity): Promise<string>;
  // login(oldPassword: string, newPassword: string): Promise<boolean>;
}
