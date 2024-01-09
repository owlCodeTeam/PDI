import { MessageEntity } from "./entity/message.entity";
import { userEntity } from "./entity/user.entity";

export interface QuerychatRepositoryInterface {
  getMessage(receiver: userEntity, sender: userEntity): Promise<MessageEntity[]>;
}
