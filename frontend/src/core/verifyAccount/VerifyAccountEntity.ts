export type responseProps = {
    status: boolean,
    message: string | null,
    color: string | null,
    route: string | null
}

export default class VerifyAccountEntity {
    constructor(readonly response?:responseProps) {
        this.response = {
            status: false,
            message: null,
            color: null,
            route: null
        }
    }

    execute(responseGateway:any) {
        if (responseGateway == 'Get Mock Success') {
            this.response.status = true
            this.response.message = 'Conta validada com sucesso!'
            this.response.color = 'green-7'
            this.response.route = '/'
        }
        return this.response
    }

    newRequest(responseGateway:any) {
        if (responseGateway.message == 'token gerado com sucesso') {
            this.response.status = true
        }
        if (!(responseGateway.message == 'token gerado com sucesso')) {
            throw new Error('Não foi possivél gerar outro token')
        }
        return this.response
    }
}