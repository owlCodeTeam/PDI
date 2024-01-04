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
        if (responseGateway.status == 200) {
            this.response.status = true
        }
        return this.response
    }
}