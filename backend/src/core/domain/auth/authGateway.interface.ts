import { userEntity } from "@domain/auth/entity/user.entity";
export type verifyOutput = {
  email: string;
  expiresIn: string;
  iat: number;
};

export interface authGatewayInterface {
  tokenGenerate(user: userEntity): Promise<string>;
  validatePassword(user: userEntity, password: string): Promise<boolean>;
  encryptPassword(password: string): Promise<string>;
  tokenDecoding(token: string): Promise<verifyOutput>;
  verifyCpf(cpf: string): Promise<boolean>;
}
