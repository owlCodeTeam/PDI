export type responseType = {
    status: boolean,
    route: string
}

export default class LoginEntity {
    constructor(readonly response?:responseType) {
        this.response = {
            status: false,
            route: ''
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