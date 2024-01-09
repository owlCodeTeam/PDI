import { ChatEntity } from "./entity/chat.entity";
export type chatSaveInput = {
  chatName: string;
  uuid: string;
  chat_users: string[];
};
export interface chatRepositoryInterface {
  save(chat: ChatEntity): Promise<ChatEntity>;
}
