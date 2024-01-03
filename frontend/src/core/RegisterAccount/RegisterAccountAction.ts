import RegisterAccountGateway from "src/infra/RegisterAccount/RegisterAccountGateway";
import RegisterAccountDataEntity from "./RegisterAccountDataEntity";

export default class RegisterAccountAction {
    constructor(readonly gateway:RegisterAccountGateway) {}

    async execute(user:RegisterAccountDataEntity) {
        return await this.gateway.register(user)
    }
}