// import { chatRepositoryInterface, chatSaveInput } from "../chatRepository.interface";
// import { ChatEntity } from "../entity/chat.entity";

// export class saveChatUsecase {
//   constructor(readonly repo: chatRepositoryInterface) {}
//   public async execute(chat: chatSaveInput) {
//     const newChat = new ChatEntity({
//       chatName: chat.chatName,
//       chat_users: chat.chat_users,
//       uuid: chat.uuid,
//     });
//     this.repo.save(newChat);
//   }
// }
