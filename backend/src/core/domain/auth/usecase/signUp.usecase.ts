import { authGatewayInterface } from "../authGateway.interface";
import { userEntity } from "../entity/user.entity";

export class signUpUsecase {
  constructor(readonly gateway: authGatewayInterface) {}
  public async execute(user: userEntity): Promise<string> {
    return await this.gateway.save(user);
  }
}
