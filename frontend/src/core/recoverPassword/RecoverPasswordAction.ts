import RecoverPasswordGateway from "src/infra/recoverPassword/RecoverPasswordGateway";

export default class RecoverPasswordAction {
    constructor(readonly gateway:RecoverPasswordGateway) {}

    async executeGetToken(email:string) {
        return await this.gateway.getToken(email)
    }

    async executeRecoverPassword(user:object) {
        return await this.gateway.recoverPassword(user)   
    }
}