export default interface SocketIOGateway {
    receive(url:string): Promise<any>
    send(data:any): Promise<any>
}