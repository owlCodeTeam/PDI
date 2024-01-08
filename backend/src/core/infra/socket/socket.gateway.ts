import { SubscribeMessage, WebSocketGateway, WebSocketServer, MessageBody, OnGatewayConnection } from "@nestjs/websockets";
import { Server } from "socket.io";
@WebSocketGateway(4000, {
  cors: {
    origin: "http://localhost:9000/",
    methods: ["GET", "POST"],
    credentials: true,
  },
})
export class socketIoGateway implements OnGatewayConnection {
  private users: any = {};
  @WebSocketServer()
  server: Server;

  handleConnection(client: any, ...args: any[]) {
    console.log(client.id);
    this.users[client.id] = {};
  }
  @SubscribeMessage("receive-message")
  handleMessage(@MessageBody() message: string): void {
    this.server.emit("receive-message", message);
  }
}
