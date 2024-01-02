import { authGatewayInterface } from "@domain/auth/authGateway.interface.ts";
import { userEntity } from "@domain/auth/entity/user.entity";

export class GenerateTokenUsecase {
  constructor(readonly gateway: authGatewayInterface) {}

  public async execute(user: userEntity) {
    // if (user.password() === "123") {
    //   return { token: "abc" };
    // }
    // throw new Error("Dados inválidos");
    return await this.gateway.sign(user, "3d");
  }
}
