import { AuthRepositoryInterface } from "@domain/auth/authRepository.interface";
import { UserEntity } from "@domain/auth/entity/user.entity";
import { DataSource } from "typeorm";
import { UserModel } from "./database/models/User.model";

export class AuthRepositoryTypeorm implements AuthRepositoryInterface {
  constructor(readonly dataSource: DataSource) {}

  async getByUsername(username: string): Promise<UserEntity> {
    const userModel = await this.dataSource
      .getRepository(UserModel)
      .createQueryBuilder()
      .where("email = :email", { email: username })
      .getOne();

    if (!userModel) {
      return;
    }

    const user = new UserEntity({
      uuid: userModel.uuid,
      name: userModel.name,
      email: userModel.email,
    });

    return user;
  }
}
