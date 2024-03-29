export type responseType = {
    status: boolean
}

export default class SocketIoEntity {
    constructor(readonly response?:responseType) {
        this.response = {
            status: false
        }
    }

    execute(responseGateway:any) {
        console.log(responseGateway)
        if (responseGateway) {
            if (!(responseGateway.status > 299)) {
                this.response.status = true
            }
            if (responseGateway.status > 299) {
                throw new Error(responseGateway.data.message)
            }
            return this.response
        } else {
            throw new Error('Desculpe, no momento não é possível acessar o sistema.')
        }
    }
}