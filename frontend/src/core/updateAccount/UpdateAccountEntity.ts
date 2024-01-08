export type responseType = {
    status: boolean
}

export default class UpdateAccountEntity {
    constructor(readonly response?:responseType) {
        this.response = {
            status: false
        }
    }

    execute(responseGateway:any) {
        if (!(responseGateway.status > 299)) {
            this.response.status = true
        }
        if (responseGateway.status > 299) {
            throw new Error(responseGateway.data.message)
        }
        return this.response
    }
}