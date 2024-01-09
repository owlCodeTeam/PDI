import { AuthRepositoryInterface } from "@domain/auth/authRepository.interface";
import { userEntity } from "@domain/auth/entity/user.entity";
import { DataSource } from "typeorm";
import { UserModel } from "./database/models/User.model";
import { updateUserInput } from "@domain/user/usecases/updateUser.usecase";
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
  async getById(uuid: string): Promise<userEntity> {
    const userModel = await this.dataSource
      .getRepository(UserModel)
      .createQueryBuilder()
      .where("uuid = :uuid", { uuid: uuid })
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
    const userModel = await this.dataSource
      .getRepository(UserModel)
      .createQueryBuilder("user")
      .where("email = :email", { email: user.email() })
      .getOne();
    if (userModel) {
      await this.dataSource
        .createQueryBuilder()
        .update(UserModel)
        .set({
          email: user.email(),
          name: user.name(),
          is_verify: user.is_verify(),
        })
        .where("email = :email", { email: user.email() })
        .execute();
      const responseUser = new userEntity({
        uuid: userModel.uuid,
        name: userModel.name,
        email: userModel.email,
        password: userModel.password,
        cpf: userModel.cpf,
        is_verify: userModel.is_verify,
      });
      return responseUser;
    } else {
      this.dataSource
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
      return user;
    }
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
  async updateUser(user: updateUserInput, _id: string): Promise<void> {
    await this.dataSource
      .createQueryBuilder()
      .update(UserModel)
      .set({
        email: user.email,
        name: user.username,
      })
      .where("uuid = :uuid", { uuid: _id })
      .execute();
  }
}
