import { Injectable } from "@nestjs/common";
import { Server } from "socket.io";
// import { SocketGatewayInterface } from "@domain/socket/socket.interface";

@Injectable() // Adicione o decorador Injectable
export class SocketIoGateway {
  constructor(readonly server?: Server) {}
  private users: Record<string, any> = {};
  async connect(): Promise<void> {
    this.server.on("connect", async (socket) => {
      console.log("ok");
    });
    this.server.emit("receive-message", "OK");
  }
}
