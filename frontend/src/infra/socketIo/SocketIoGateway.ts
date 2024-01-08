export default interface SocketIOGateway {
    receive(url:string): Promise<any>
    send(url:string, data:any): Promise<any>
}