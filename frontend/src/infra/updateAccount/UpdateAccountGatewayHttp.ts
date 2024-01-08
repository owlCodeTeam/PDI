import UpdateAccountEntity from "src/core/updateAccount/UpdateAccountEntity";
import HttpClient from "../http/HttpClient";
import UpdateAccountGateway from "./UpdateAccountGateway";
const updateAccountEntity = new UpdateAccountEntity()

export default class UpdateAccountGatewayHttp implements UpdateAccountGateway {
    constructor(readonly httpClient:HttpClient, readonly baseUrl:string) {}

    async udpate(user:object, id:string): Promise<any> {
        const responseGateway = await this.httpClient.patch(`${this.baseUrl}update/${id}`, user)
        const response = updateAccountEntity.execute(responseGateway)
        return response 
    }
}