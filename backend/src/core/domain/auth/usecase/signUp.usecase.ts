import { authGatewayInterface } from "../authGateway.interface";
import { UserEntity } from "../entity/user.entity";

export class signUpUsecase {
  constructor(readonly gateway: authGatewayInterface) {}
  public async execute(user: UserEntity): Promise<string> {
    // return await this.gateway.save(user);
    return "sdf";
  }
}
