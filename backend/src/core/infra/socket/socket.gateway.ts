import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway(4000, {
  cors: {
    origin: "*",
    credentials: false,
  },
})
export class socketIoGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private users: Record<string, any> = {};
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
    this.users[client.id] = {};
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    delete this.users[client.id];
  }

  @SubscribeMessage("receive-message")
  handleMessage(@MessageBody() message: string): void {
    this.server.emit("receive-message", message);
  }
}
