import { userGatewayLocal } from "@infra/auth/gateways/userGateway.local";
export type loginInput = {
  newPassword: string;
  oldPassword: string;
};
export class loginUsecase {
  constructor(readonly gateway: userGatewayLocal) {}
  public async execute(loginInput: loginInput): Promise<boolean> {
    return await this.gateway.login(loginInput.oldPassword, loginInput.newPassword);
  }
}
