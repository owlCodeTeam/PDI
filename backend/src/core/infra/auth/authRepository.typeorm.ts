import { AuthRepositoryInterface } from "@domain/auth/authRepository.interface";
import { userEntity } from "@domain/auth/entity/user.entity";
import { DataSource } from "typeorm";
import { UserModel } from "./database/models/User.model";
import { response } from "express";
export class AuthRepositoryTypeorm implements AuthRepositoryInterface {
  constructor(readonly dataSource: DataSource) {}

  async getByUsername(username: string): Promise<userEntity> {
    const userModel = await this.dataSource
      .getRepository(UserModel)
      .createQueryBuilder()
      .where("email = :email", { email: username })
      .getOne();

    if (!userModel) {
      return;
    }

    const user = new userEntity({
      uuid: userModel.uuid,
      name: userModel.name,
      email: userModel.email,
      password: userModel.password,
      cpf: userModel.cpf,
      is_verify: userModel.is_verify,
    });

    return user;
  }
  async save(user: userEntity): Promise<userEntity> {
    await this.dataSource;
    const existingUser = await this.dataSource
      .getRepository(UserModel)
      .createQueryBuilder("user")
      .where("email = :email", { email: user.email() })
      .getOne();
    if (existingUser) {
      await this.dataSource
        .createQueryBuilder()
        .update(UserModel)
        .set({
          email: user.email(),
          name: user.name(),
          password: user.password(),
          is_verify: user.is_verify(),
          cpf: user.cpf(),
        })
        .where("email = :email", { email: user.email() })
        .execute();
    } else {
      const response = await this.dataSource
        .createQueryBuilder()
        .insert()
        .into(UserModel)
        .values([
          {
            uuid: user.uuid(),
            email: user.email(),
            name: user.name(),
            password: user.password(),
            is_verify: user.is_verify(),
            cpf: user.cpf(),
          },
        ])
        .execute();
    }
    console.log(response);
    return user;
  }
  async setCheckedAccount(email: string): Promise<void> {
    await this.dataSource
      .createQueryBuilder()
      .update(UserModel)
      .set({ is_verify: true })
      .where("email = :email ", { email: email })
      .execute();
  }
  async setNewPassword(newPassword: string, email: string): Promise<void> {
    await this.dataSource
      .createQueryBuilder()
      .update(UserModel)
      .set({ password: newPassword })
      .where("email = :email ", { email: email })
      .execute();
  }
}
