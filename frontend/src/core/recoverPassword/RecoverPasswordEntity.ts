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
        console.log(responseGateway)
        if (responseGateway.message === 'token gerado com sucesso') {
            this.response.statusEmail = true
        }   
        if (!(responseGateway.message === 'token gerado com sucesso')) {
            throw new Error(responseGateway.message)
        }
        return this.response
    }

    executeRecoverPassword(responseGateway:any) {
        if (!(responseGateway.status > 299)) {
            this.response.passwordChangeStatus = true
        }
        if (responseGateway.status > 299) {
            throw new Error(responseGateway.message)
        }
        return this.response
    }
}