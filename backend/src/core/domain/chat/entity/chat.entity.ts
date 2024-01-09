export type chatProps = {
  chatName: string;
  uuid: string;
  chat_users: string[];
};
export class ChatEntity {
  constructor(readonly props: chatProps) {}
  chatName(): string {
    return this.props.chatName;
  }
  uuid(): string {
    return this.props.uuid;
  }
  chat_users(): string[] {
    return this.props.chat_users;
  }
  updateChatName(chatName: string) {
    this.props.chatName = chatName;
  }
  updateUuid(uuid: string) {
    this.props.uuid = uuid;
  }
  updateChat_users(chat_user: string[]) {
    this.props.chat_users = chat_user;
  }
}
