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
        console.log(responseGateway)
        if (!(responseGateway.status > 299)) {
            this.response.status = true
            this.response.message = responseGateway.data.message
            this.response.color = 'green-7'
            this.response.route = '/'
        } 
        if (responseGateway.status > 299) {
            throw new Error('Conta verificada com sucesso')
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