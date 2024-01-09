import SocketIOGateway from "src/infra/socketIo/SocketIoGateway";

export default class SocketIoAction {
    constructor(readonly gateway:SocketIOGateway, ) {}

    async executeSend(data:object) {
        return await this.gateway.send(data)
    } 

    async executeReceive(url:string) {
        return await this.gateway.receive(url)
    }  
}