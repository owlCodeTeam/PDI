import SocketIOGateway from "src/infra/socketIo/SocketIoGateway";

export default class SocketIoAction {
    constructor(readonly gateway:SocketIOGateway, ) {}

    async executeReceive(url:string) {
        return await this.gateway.receive(url)
    }

    async executeSend(url:string, data:any) {
        return await this.gateway.send(url, data)
    }   
}