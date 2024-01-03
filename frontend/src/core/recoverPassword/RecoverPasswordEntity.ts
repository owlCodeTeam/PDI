export type responseType = {
    statusEmail: boolean,
    statusToken: boolean
}

export default class RecoverPasswordEntity {
    constructor(readonly response?:responseType) {
        this.response = {
            statusEmail: false,
            statusToken: false
        }
    }

    executeSendEmail(responseGateway:any) {
        if (responseGateway === 'Get Mock Success') {
            this.response.statusEmail = true
        }   
        return this.response?.statusEmail
    }

    executeSendToken(responseGateway:any) {
        if (responseGateway === 'Get Mock Success') {
            this.response.statusToken = true
        }
        return this.response?.statusToken
    }
}