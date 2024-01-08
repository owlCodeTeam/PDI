import { SubscribeMessage, WebSocketGateway, WebSocketServer, MessageBody, OnGatewayConnection } from "@nestjs/websockets";
import { Server } from "socket.io";
@WebSocketGateway()
export class socketIoGateway implements OnGatewayConnection {
  private users: any = {};
  @WebSocketServer()
  server: Server;

  handleConnection(client: any, ...args: any[]) {
    this.users[client.id] = {};
  }
  @SubscribeMessage("receive-message")
  handleMessage(@MessageBody() message: string): void {
    console.log(message);
  }
}
