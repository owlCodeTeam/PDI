import RecoverPasswordGateway from "src/infra/recoverPassword/RecoverPasswordGateway";

export default class RecoverPasswordAction {
    constructor(readonly gateway:RecoverPasswordGateway) {}

    async executeSendEmail(email:string) {
        return await this.gateway.sendEmail(email)
    }

    async executeSendToken(token:string) {
        return await this.gateway.sendToken(token)   
    }
}