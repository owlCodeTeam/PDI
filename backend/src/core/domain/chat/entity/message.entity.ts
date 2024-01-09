import { userEntity } from "./user.entity";

export type MessageProps = {
  Message: string;
  uuid: string;
  Message_sender: userEntity;
  Message_reciever: userEntity;
};
export class MessageEntity {
  constructor(readonly props: MessageProps) {}
  Message(): string {
    return this.props.Message;
  }
  uuid(): string {
    return this.props.uuid;
  }
  Message_sender(): userEntity {
    return this.props.Message_sender;
  }
  Message_reciever(): userEntity {
    return this.props.Message_reciever;
  }
  updateMessage(Message: string) {
    this.props.Message = Message;
  }
  updateUuid(uuid: string) {
    this.props.uuid = uuid;
  }
  updateMessage_sender(Message_sender: userEntity) {
    this.props.Message_sender = Message_sender;
  }
  updateMessage_reciever(Message_reciever: userEntity) {
    this.props.Message_reciever = Message_reciever;
  }
}
