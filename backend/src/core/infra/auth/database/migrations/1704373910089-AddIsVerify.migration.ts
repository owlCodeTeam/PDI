import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsVerify1704373910089 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE auth_users ADD COLUMN is_verify boolean DEFAULT false`);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE auth_users DROP COLUMN is_verify`);
  }
}
