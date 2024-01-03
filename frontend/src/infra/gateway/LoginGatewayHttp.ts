import HttpClient from "../http/HttpClient";
import LoginGateway from "./LoginGateway";
import Login from "src/core/Login";
const login = new Login()

export default class LoginGatewayHttp implements LoginGateway {
    constructor(readonly httpClient:HttpClient, readonly baseUrl:string) {}
    
    async login(user: object): Promise<any> {
        const responseGateway = await this.httpClient.post(`${this.baseUrl}`, user) 
        const response = login.execute(responseGateway) 
        return response
    }
}