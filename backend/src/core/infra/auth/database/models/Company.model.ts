import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("auth_companies")
export class CompanyModel {
  @PrimaryColumn()
  uuid: string;

  @Column()
  name: string;
  @Column()
  cpf_cnpj: string;
  @Column()
  email: string;
  @Column({ nullable: true })
  cns: string;
}
