import { MessageEntity } from "@domain/chat/entity/message.entity";
import { SocketGatewayInterface } from "@domain/socket/socket.interface";
import { apiError } from "@infra/http/nestjs/helpers/api-Error.helper";
import { Injectable } from "@nestjs/common";
import { Server } from "socket.io";

@Injectable()
export class SocketIoGateway implements SocketGatewayInterface {
  private users: Record<string, any> = {};
  constructor(readonly server: Server) {}
  public async sendMessage(message: MessageEntity): Promise<void> {
    try {
      const messageInput = {
        message: message.Message(),
        receiver: message.Message_reciever().props,
        sender: message.Message_sender().props,
      };
      await this.server.emit("send-message", messageInput);
    } catch (error) {
      throw new apiError("Erro no envio do socket", 500, "internal_server_error");
    }
  }
}
