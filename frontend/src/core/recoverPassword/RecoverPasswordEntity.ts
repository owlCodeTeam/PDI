export type responseType = {
    statusEmail: boolean,
    passwordChangeStatus: boolean
}

export default class RecoverPasswordEntity {
    constructor(readonly response?:responseType) {
        this.response = {
            statusEmail: false,
            passwordChangeStatus: false
        }
    }

    executeGetToken(responseGateway:any) {
        if (responseGateway) {
            if (!(responseGateway.status > 299)) {
                this.response.statusEmail = true
            }   
            if (responseGateway.status > 299) {
                throw new Error(responseGateway.message)
            }
            return this.response
        } else {
            throw new Error('Desculpe, no momento não é possível acessar o sistema.')
        }
    }

    executeRecoverPassword(responseGateway:any) {
        if (responseGateway) {
            if (!(responseGateway.status > 299)) {
                this.response.passwordChangeStatus = true
            }
            if (responseGateway.status > 299) {
                throw new Error(responseGateway.message)
            }
            return this.response
        } else {
            throw new Error('Desculpe, no momento não é possível acessar o sistema.')
        }
    }
}