import { MessageEntity } from "@domain/chat/entity/message.entity";

export interface SocketGatewayInterface {
  sendMessage(message: MessageEntity): Promise<void>;
}
