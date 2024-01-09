import { SocketGatewayInterface } from "@domain/socket/socket.interface";
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
@WebSocketGateway()
export class socketIoGateway implements OnGatewayConnection, OnGatewayDisconnect, SocketGatewayInterface {
  constructor(readonly server: Server) {}
  private users: Record<string, any> = {};
  @WebSocketServer()
  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
    this.users[client.id] = {};
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    delete this.users[client.id];
  }

  @SubscribeMessage("receive-message")
  async handleMessage(@MessageBody() message: string): Promise<void> {
    console.log(message);
    this.server.emit("receive-message", message);
  }
  @SubscribeMessage("send-Notification")
  async sendNotification(notification: string): Promise<void> {
    this.server.emit(notification);
  }
}
