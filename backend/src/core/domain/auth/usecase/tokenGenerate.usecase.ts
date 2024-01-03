import { authGatewayInterface } from "@domain/auth/authGateway.interface";

export type GenetareTokenInput = {
  username: string;
  password: string;
};

export class GenerateTokenUsecase {
  constructor(readonly gateway: authGatewayInterface) {}

  public async execute(input: GenetareTokenInput) {
    return await this.gateway.sign(input.username, input.password, "1d");
  }
}
