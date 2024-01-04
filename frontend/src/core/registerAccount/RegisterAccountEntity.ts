export type responseType = {
    status: boolean
}

export default class RegisterAccountEntity {
    constructor(readonly response?:responseType) {
        this.response = {
            status: false
        }
    }

    execute(responseGateway:any) {
        if (responseGateway.message == 'Usuario cadastrado com sucesso') {
            this.response.status = true
        }
        if (!(responseGateway.message == 'Usuario cadastrado com sucesso')) {
            throw new Error(responseGateway.message)
        }
        return this.response
    }
}