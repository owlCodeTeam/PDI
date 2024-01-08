import UpdateAccountGateway from "src/infra/updateAccount/UpdateAccountGateway";
import UpdateAccountDataEntity from "./UpdateAccountDataEntity";

export default class UpdateAccountAction {
    constructor(readonly gateway:UpdateAccountGateway) {}

    async execute(user:UpdateAccountDataEntity, id:string) {
        return await this.gateway.udpate(user, id)
    }
}