export type MessageProps = {
  Message: string;
  uuid: string;
  Message_sender: string;
  Message_reciever: string;
};
export class MessageEntity {
  constructor(readonly props: MessageProps) {}
  Message(): string {
    return this.props.Message;
  }
  uuid(): string {
    return this.props.uuid;
  }
  Message_sender(): string {
    return this.props.Message_sender;
  }
  Message_reciever(): string {
    return this.props.Message_reciever;
  }
  updateMessage(Message: string) {
    this.props.Message = Message;
  }
  updateUuid(uuid: string) {
    this.props.uuid = uuid;
  }
  updateMessage_sender(Message_sender: string) {
    this.props.Message_sender = Message_sender;
  }
  updateMessage_reciever(Message_reciever: string) {
    this.props.Message_reciever = Message_reciever;
  }
}
