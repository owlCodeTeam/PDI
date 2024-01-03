import LoginGateway from "src/infra/Login/LoginGateway";
import LoginDataEntity from "./LoginDataEntity";

export default class LoginAction {
    constructor(readonly gateway:LoginGateway) {}

    async execute(user:LoginDataEntity) {
        return await this.gateway.login(user)
    }
}