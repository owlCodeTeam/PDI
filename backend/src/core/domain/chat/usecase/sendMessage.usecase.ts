import { SocketGatewayInterface } from "@domain/socket/socket.interface";
import { chatRepositoryInterface } from "../chatRepository.interface";
import { MessageEntity } from "../entity/message.entity";
import * as crypto from "crypto";
export type sendMessageInput = {
  receiver: string;
  sender: string;
  message: string;
};
export class sendMessageUsecase {
  constructor(
    readonly repo: chatRepositoryInterface,
    readonly socketRepo: SocketGatewayInterface,
  ) {}
  public async execute(input: sendMessageInput) {
    const receiver = await this.repo.getUserByUuid(input.receiver);
    const sender = await this.repo.getUserByUuid(input.sender);
    const message = new MessageEntity({
      Message: input.message,
      Message_reciever: receiver,
      Message_sender: sender,
      uuid: crypto.randomUUID(),
    });
    await this.repo.sendMessage(message);
    await this.socketRepo.sendMessage(message);
  }
}
