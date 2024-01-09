import { MessageEntity } from "@domain/chat/entity/message.entity";
import { userEntity } from "@domain/chat/entity/user.entity";
import { QuerychatRepositoryInterface } from "@domain/chat/queryChatRepository.interface";
import { messageModel } from "./models/Message.model";
import { DataSource } from "typeorm";

export class QuerychatRepository implements QuerychatRepositoryInterface {
  constructor(readonly dataSource: DataSource) {}
  async getMessage(receiver: userEntity, sender: userEntity): Promise<MessageEntity[]> {
    const messages: MessageEntity[] = [];
    const messagesDb: messageModel[] = await this.dataSource
      .getRepository(messageModel)
      .createQueryBuilder()
      .where("receiver = :receiver && sender = :sender", {sender: sender, })
      .getMany();
    for (const message of messagesDb) {
      const new_message = new MessageEntity({
        Message: message.message,
        Message_reciever: receiver,
        Message_sender: sender,
        uuid: message.uuid,
      });
      messages.push(new_message);
    }
    return messages;
  }
}
