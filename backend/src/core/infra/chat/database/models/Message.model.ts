import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { UserModel } from "../../../auth/database/models/User.model";

@Entity("chat_messages")
export class messageModel {
  @PrimaryColumn()
  uuid: string;

  @Column()
  message: string;

  @ManyToOne(() => UserModel, { eager: true })
  @JoinColumn({ name: "sender", referencedColumnName: "uuid" })
  sender: string;

  @ManyToOne(() => UserModel, { eager: true })
  @JoinColumn({ name: "receiver", referencedColumnName: "uuid" })
  receiver: string;
}
