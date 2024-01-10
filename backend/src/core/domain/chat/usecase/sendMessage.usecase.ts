import { SocketGatewayInterface } from "@domain/socket/socket.interface";
import { chatRepositoryInterface } from "../chatRepository.interface";
import { MessageEntity } from "../entity/message.entity";
import * as crypto from "crypto";
import { apiError } from "@infra/http/nestjs/helpers/api-Error.helper";
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
    if (!receiver && !sender) {
      throw new apiError("O remetente e o destinatario não existem no banco de dados", 404, "user_not_found");
    } else if (!receiver) {
      throw new apiError("O usuario que está recebendo a mensagem não existe", 404, "user_not_found");
    } else if (!sender) {
      throw new apiError("O usuario que está enviando a mensagem não existe", 404, "user_not_found");
    }
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
