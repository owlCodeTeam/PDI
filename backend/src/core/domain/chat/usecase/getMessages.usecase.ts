import { chatRepositoryInterface } from "../chatRepository.interface";
import { QuerychatRepositoryInterface } from "../queryChatRepository.interface";
export type sendMessageInput = {
  receiver: string;
  sender: string;
};
export class getMessagesUsecase {
  constructor(
    readonly repo: chatRepositoryInterface,
    readonly query: QuerychatRepositoryInterface,
  ) {}
  public async execute(input: sendMessageInput) {
    const receiver = await this.repo.getUserByUuid(input.receiver);
    const sender = await this.repo.getUserByUuid(input.sender);
    const messages = await this.query.getMessage(receiver, sender);
    return messages;
  }
}
