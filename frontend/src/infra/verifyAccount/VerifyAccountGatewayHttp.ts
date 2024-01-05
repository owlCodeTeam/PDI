import VerifyAccountEntity from "src/core/verifyAccount/VerifyAccountEntity";
import HttpClient from "../http/HttpClient";
import VerifyAccountGateway from "./VerifyAccountGateway";
const verifyAccountEntity = new VerifyAccountEntity()

export default class VerifyAccountGatewayHttp implements VerifyAccountGateway {
    constructor(readonly httpClient:HttpClient, readonly baseUrl:string) {}
    
    async verify(token: string): Promise<any> {
        const responseGateway = await this.httpClient.get(`${this.baseUrl}verify/account/${token}`)
        const response = verifyAccountEntity.execute(responseGateway)
        return response
    }

    async newEmailRequest(email: string): Promise<any> {
        const responseGateway = await this.httpClient.get(`${this.baseUrl}send/token/${email}`)
        const response = verifyAccountEntity.newRequest(responseGateway)
        return response
    }
}