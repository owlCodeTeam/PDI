import { authGatewayInterface } from "@domain/auth/authGateway.interface";
import { userEntity } from "@domain/auth/entity/user.entity";

export class GenerateTokenUsecase {
  constructor(readonly gateway: authGatewayInterface) {}

  public async execute(user: userEntity) {
    return await this.gateway.sign(user, "3d");
  }
}
