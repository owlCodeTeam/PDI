import { chatRepositoryInterface } from "@domain/chat/chatRepository.interface";
import { DataSource } from "typeorm";
import { messageModel } from "./models/Message.model";
import { MessageEntity } from "@domain/chat/entity/message.entity";
import { apiError } from "@infra/http/nestjs/helpers/api-Error.helper";
import { userEntity } from "@domain/chat/entity/user.entity";
import { UserModel } from "@infra/auth/database/models/User.model";

export class chatRepositoryOrm implements chatRepositoryInterface {
  constructor(readonly dataSource: DataSource) {}
  async sendMessage(message: MessageEntity): Promise<void> {
    try {
      await this.dataSource.createQueryBuilder().insert().into(messageModel).values({
        uuid: message.uuid(),
        message: message.Message(),
        receiver: message.Message_reciever().uuid(),
        sender: message.Message_sender().uuid(),
      });
    } catch (error) {
      throw new apiError("Erro enquanto salvava a mensagem", 500, "internal_server_error");
    }
  }
  async getUserByUuid(uuid: string): Promise<userEntity> {
    const userModel = await this.dataSource
      .getRepository(UserModel)
      .createQueryBuilder()
      .where("uuid = :uuid", { uuid: uuid })
      .getOne();

    if (!userModel) {
      return;
    }

    const user = new userEntity({
      uuid: userModel.uuid,
      name: userModel.name,
      email: userModel.email,
    });

    return user;
  }
  // async getMessage(0): Promise<MessageEntity[]> {
  //   const messages: MessageEntity[] = [];
  //   const messagesDb: messageModel[] = await this.dataSource.getRepository(messageModel).createQueryBuilder().getMany();
  //   for (const message of messagesDb) {
  //     const new_message = new MessageEntity({
  //       Message: message.message,
  //       Message_reciever: message.receiver,
  //       Message_sender: message.sender,
  //       uuid: message.uuid,
  //     });
  //     messages.push(message);
  //   }
  // }
}
