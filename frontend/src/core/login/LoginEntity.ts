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
        if (responseGateway === 'Post Mock Success') {
            this.response.status = true
        }
        return this.response
    }
}