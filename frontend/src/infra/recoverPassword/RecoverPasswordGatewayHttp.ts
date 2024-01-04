import RecoverPasswordEntity from "src/core/recoverPassword/RecoverPasswordEntity";
import HttpClient from "../http/HttpClient";
import RecoverPasswordGateway from "./RecoverPasswordGateway";
const recoverPasswordEntity = new RecoverPasswordEntity()

export default class RecoverPasswordGatewayHttp implements RecoverPasswordGateway {
    constructor(readonly httpClient:HttpClient, readonly baseUr:string) {}
    
    async sendEmail(email:string): Promise<any> {
        const responseGateway = await this.httpClient.get(`${this.baseUr}/${email}`)
        const response = recoverPasswordEntity.executeSendEmail(responseGateway)
        return response
    }

    async sendToken(token:string): Promise<any> {
        const responseGateway = await this.httpClient.get(`${this.baseUr}/${token}`)
        const response = recoverPasswordEntity.executeSendToken(responseGateway)
        return response
    }
}