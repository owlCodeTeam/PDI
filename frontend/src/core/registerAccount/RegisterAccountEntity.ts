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
        if (responseGateway.status == 200) {
            this.response.status = true
        }
        if (!(responseGateway.status == 200)) {
            throw new Error('Erro ao tentar registrar uma nova conta!')
        }
        return this.response
    }
}