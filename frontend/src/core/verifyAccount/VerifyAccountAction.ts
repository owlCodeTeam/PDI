import VerifyAccountGateway from "src/infra/verifyAccount/VerifyAccountGateway";

export default class VerifyAccountAction {
    constructor(readonly gateway:VerifyAccountGateway) {}

    async execute(token:string) {
        return await this.gateway.verify(token)
    }

    async newRequest(email:string) {
        return await this.gateway.newEmailRequest(email)
    }
}