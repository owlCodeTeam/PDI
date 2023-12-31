import LoginEntity from "src/core/login/LoginEntity";
import HttpClient from "../http/HttpClient";
import LoginGateway from "./LoginGateway";
const loginEntity = new LoginEntity()

export default class LoginGatewayHttp implements LoginGateway {
    constructor(readonly httpClient:HttpClient, readonly baseUrl:string) {}
    
    async login(user: object): Promise<any> {
        const responseGateway = await this.httpClient.post(`${this.baseUrl}token-generate`, user) 
        const response = loginEntity.execute(responseGateway) 
        return response
    }
}