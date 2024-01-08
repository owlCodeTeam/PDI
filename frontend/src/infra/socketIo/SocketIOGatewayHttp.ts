import SocketIOGateway from "./SocketIoGateway";

export default class SocketIoGatewayHttp implements SocketIOGateway {
    constructor(readonly socket:any) {}
    
    async receive(url: string): Promise<any> {
        this.socket.on(url, (data:any) => {
            return data
        })
    }

    async send(url: string, data: any): Promise<any> {
        await this.socket.emit(url, data)
    }
}