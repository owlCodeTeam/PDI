import LoginGateway from "src/infra/gateway/LoginGateway";

export default class LoginAction {
    constructor(readonly gateway: LoginGateway) {}

    async execute(user: object) {
        return await this.gateway.login(user)
    }

}