import { ApiTags } from "@nestjs/swagger";
import { Body, Controller, Get, HttpStatus, Param, Post, Res } from "@nestjs/common";
import { chatRepositoryOrm } from "@infra/chat/database/chatRepository.typeorm";
import { SocketIoGateway } from "@infra/socket/socket.gateway";
import { sendMessageDto } from "./sendMessage.dto";
import { sendMessageUsecase } from "@domain/chat/usecase/sendMessage.usecase";
import { getMessagesUsecase } from "@domain/chat/usecase/getMessages.usecase";
import { QuerychatRepository } from "@infra/chat/database/QueryChatReposiotry.query";
@ApiTags("Chat")
@Controller()
export class ChatController {
  constructor(
    readonly chatRepo: chatRepositoryOrm,
    readonly socketGateway: SocketIoGateway,
    readonly query: QuerychatRepository,
  ) {}
  @Post("send/message")
  async sendMessage(@Body() body: sendMessageDto, @Res() response) {
    const action = new sendMessageUsecase(this.chatRepo, this.socketGateway);
    await action.execute(body);
    response.status(HttpStatus.OK).send({
      message: "mensagem enviada com sucesso",
    });
  }
  @Get("messages/:receiver/:sender")
  async getMessages(@Res() response, @Param("sender") sender: string, @Param("receiver") receiver: string) {
    const formmatedMessages: any[] = [];
    const input = {
      sender: sender,
      receiver: receiver,
    };
    const action = new getMessagesUsecase(this.chatRepo, this.query);
    const messages = await action.execute(input);
    for (const message of messages) {
      const messagesFormmated = {
        message: message.Message(),
        receiver: message.Message_reciever().props,
        sender: message.Message_sender().props,
        uuid: message.uuid(),
      };
      formmatedMessages.push(messagesFormmated);
    }
    response.status(HttpStatus.OK).send({
      message: "mensagens encontradas com sucesso",
      formmatedMessages,
    });
  }
}
