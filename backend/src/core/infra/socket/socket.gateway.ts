import { SubscribeMessage, WebSocketGateway, WebSocketServer, MessageBody, OnGatewayConnection } from "@nestjs/websockets";
import { Server } from "socket.io";
@WebSocketGateway()
export class chatGateway implements OnGatewayConnection {
  private users = {};
  @WebSocketServer()
  server: Server;

  handleConnection(client: any, ...args: any[]) {
    this.users[client.id] = {}
  }
  @SubscribeMessage("message")
  handleMessage(@MessageBody() message: string): void {
    
  }
}
