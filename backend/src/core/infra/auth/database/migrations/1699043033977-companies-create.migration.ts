import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class MigrationCompanies1699043032977 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "auth_companies",
        columns: [
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "deleted_at",
            type: "timestamp",
            isNullable: true,
            default: null,
          },
          {
            name: "uuid",
            type: "uuid",
            isPrimary: true,
            primaryKeyConstraintName: "PK_auth_companies",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "email",
            type: "varchar",
          },
          {
            name: "cpf_cnpj",
            type: "varchar",
          },
          {
            name: "cns",
            type: "varchar",
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
