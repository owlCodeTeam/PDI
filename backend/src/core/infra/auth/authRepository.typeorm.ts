import { AuthRepositoryInterface } from "@domain/auth/authRepository.interface";
import { userEntity } from "@domain/auth/entity/user.entity";
import { DataSource } from "typeorm";
import { UserModel } from "./database/models/User.model";
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
    await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(UserModel)
      .values([
        {
          uuid: user.uuid(),
          email: user.email(),
          name: user.name(),
          password: user.password(),
          cpf: user.cpf(),
        },
      ])
      .orUpdate(["email", "password", "name", "is_verify", "cpf"], ["uuid"])
      .execute();
    return user;
  }
}
