export type responseType = {
    status: boolean
}

export default class LoginEntity {
    constructor(readonly response?:responseType) {
        this.response = {
            status: false
        }
    }

    execute(responseGateway:any) {
        console.log(responseGateway)
        if (responseGateway.message == 'token gerado com sucesso') {
            this.response.status = true
        }
        if (!(responseGateway.message == 'token gerado com sucesso')) {
            throw new Error(responseGateway.message)
        }
        return this.response
    }
}