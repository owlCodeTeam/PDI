import { Column, Entity, JoinColumn, ManyToMany, PrimaryColumn } from "typeorm";
import { UserModel } from "./User.model";

@Entity("chat_messages")
export class messageModel {
  @PrimaryColumn()
  uuid: string;

  @Column()
  message: string;
  @ManyToMany(() => UserModel, { eager: true })
  @JoinColumn({ name: "sender", referencedColumnName: "uuid" })
  sender: string;
  @ManyToMany(() => UserModel, { eager: true })
  @JoinColumn({ name: "receiver", referencedColumnName: "uuid" })
  receiver: string;
}
