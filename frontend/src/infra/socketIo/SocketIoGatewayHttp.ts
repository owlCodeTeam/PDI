import SocketIoEntity from "src/core/socketIo/SocketIoEntity";
import HttpClient from "../http/HttpClient";
import SocketIOGateway from "./SocketIoGateway";
const socketIoEntity = new SocketIoEntity()

export default class SocketIoGatewayHttp implements SocketIOGateway {
    constructor(readonly socket:any, readonly httpClient:HttpClient, readonly baseUrl:string) {}
    
    async receive(url: string): Promise<any> {
        console.log(this.socket)
        this.socket.on(url, (data:any) => {
            return data
        })
    }

    async send(data: any): Promise<any> {
        const responseGateway = await this.httpClient.post(`${this.baseUrl}send/message`, data)
        const response = socketIoEntity.execute(responseGateway)
        return response
    }
}