import RecoverPasswordEntity from "src/core/recoverPassword/RecoverPasswordEntity";
import HttpClient from "../http/HttpClient";
import RecoverPasswordGateway from "./RecoverPasswordGateway";
const recoverPasswordEntity = new RecoverPasswordEntity()

export default class RecoverPasswordGatewayHttp implements RecoverPasswordGateway {
    constructor(readonly httpClient:HttpClient, readonly baseUr:string) {}
    
    async getToken(email:string): Promise<any> {
        const responseGateway = await this.httpClient.get(`${this.baseUr}send/token/${email}`)
        const response = recoverPasswordEntity.executeGetToken(responseGateway)
        return response
    }

    async recoverPassword(user:object): Promise<any> {
        const responseGateway = await this.httpClient.post(`${this.baseUr}password/recovery`, user)
        const response = recoverPasswordEntity.executeRecoverPassword(responseGateway)
        return response
    }
}