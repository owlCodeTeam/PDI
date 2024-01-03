import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("auth_users")
export class UserModel {
  @PrimaryColumn("uuid")
  uuid: string;

  @Column()
  name: string;
  @Column()
  cpf: string;
  @Column()
  email: string;
  @Column()
  password: string;
}
