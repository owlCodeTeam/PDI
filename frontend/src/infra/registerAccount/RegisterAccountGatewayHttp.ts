import RegisterAccountEntity from "src/core/registerAccount/RegisterAccountEntity";
import HttpClient from "../http/HttpClient";
const registerAccountEntity = new RegisterAccountEntity()

export default class RegisterAccountGatewayHttp implements RegisterAccountGatewayHttp {
    constructor(readonly httpClient:HttpClient, readonly baseUrl:string) {}

    async register(user:object) {
        const responseGateway = await this.httpClient.post(`${this.baseUrl}`, user)
        const response = registerAccountEntity.execute(responseGateway)
        return response
    }
}