import { ChatEntity } from "@domain/chat/entity/chat.entity";
import { chatRepositoryInterface } from "@domain/chat/chatRepository.interface";
export class chatRepositoryMemory implements chatRepositoryInterface {
  public chats: ChatEntity[] = [];
  async save(newChat: ChatEntity): Promise<ChatEntity> {
    this.chats.push(newChat);
    return newChat;
  }
  // async getOne(_id: string): Promise<Chat> {
  //   const chat: Chat = await this.chats.find((chat) => chat._id() === _id);
  //   if (!chat) {
  //     throw new error(`Nenhuma Chat com o id igual a ${_id} foi encontrada`);
  //   }
  //   return chat;
  // }
  // async get(): Promise<Chat[]> {
  //   return this.chats;
  // }
  // async delete(_id: string): Promise<void> {
  //   const index = this.chats.findIndex((chat) => chat._id() === _id);
  //   if (index !== -1) {
  //     this.chats.splice(index, 1);
  //   } else {
  //     throw new Error("Chat não encontrada para exclusão");
  //   }
  // }
  // async update(updateInput: updateChatInput, _id: string): Promise<Chat> {
  //   const chat = await this.getOne(_id);
  //   await chat.updateCep(updateInput.cep);
  //   await chat.updateName(updateInput.name);
  //   return chat;
  // }
}
