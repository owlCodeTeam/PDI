import { MessageEntity } from "./entity/message.entity";
import { userEntity } from "./entity/user.entity";

// import { ChatEntity } from "./entity/chat.entity";
export type chatSaveInput = {
  chatName: string;
  uuid: string;
  chat_users: string[];
};

export interface chatRepositoryInterface {
  // save(chat: ChatEntity): Promise<ChatEntity>;
  sendMessage(message: MessageEntity): Promise<void>;
  getUserByUuid(uuid: string): Promise<userEntity>;
}
