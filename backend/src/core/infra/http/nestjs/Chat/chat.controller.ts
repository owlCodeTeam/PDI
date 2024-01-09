import { ApiTags } from "@nestjs/swagger";
import { Body, Controller, Get, HttpStatus, Post, Res } from "@nestjs/common";
import { chatRepositoryOrm } from "@infra/chat/database/chatRepository.typeorm";
import { SocketIoGateway } from "@infra/socket/socket.gateway";
import { sendMessageDto } from "./sendMessage.dto";
import { sendMessageUsecase } from "@domain/chat/usecase/sendMessage.usecase";
@ApiTags("Chat")
@Controller()
export class ChatController {
  constructor(
    readonly chatRepo: chatRepositoryOrm,
    readonly socketGateway: SocketIoGateway,
  ) {}
  @Post("send/message")
  async sendMessage(@Body() body: sendMessageDto, @Res() response) {
    const action = new sendMessageUsecase(this.chatRepo, this.socketGateway);
    await action.execute(body);
    response.status(HttpStatus.OK).send({
      message: "mensagem enviada com sucesso",
    });
  }
  // @Get("messages")
  // async getMessages(@Res() response) {

  // }
}
