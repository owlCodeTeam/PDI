import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Message1704811682306 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "chat_messages",
        columns: [
          {
            name: "uuid",
            type: "uuid",
            isPrimary: true,
            primaryKeyConstraintName: "PK_chat_message",
          },
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
            name: "message",
            type: "string",
          },
          {
            name: "sender",
            type: "string",
          },
          {
            name: "receiver",
            type: "string",
          },
        ],
        foreignKeys: [
          {
            columnNames: ["sender", "receiver"],
            referencedColumnNames: ["uuid"],
            referencedTableName: "auth_users",
            onDelete: "CASCADE",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
