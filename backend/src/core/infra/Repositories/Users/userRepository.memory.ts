// import { saveUserUsecase } from "@domain/auth/usecase/save.usecase";
import { userEntity } from "@domain/user/entity/user.entity";
import { loginInput, userRepositoryInterface } from "@domain/user/userRepository.interface";
// import { AuthRepositoryTypeorm } from "@infra/auth/authRepository.typeorm";
// import dataSource from "@infra/shared/database/datasource";
export class userRepositoryMemory implements userRepositoryInterface {
  public users: userEntity[] = [];
  async save(userEntity: userEntity): Promise<userEntity> {
    throw new Error("");
    // const gateway = new AuthRepositoryTypeorm(dataSource);
    // const action = new saveUserUsecase(gateway);
    // const passwordHash = await action.execute(userEntity);
    // userEntity.updatePassword(passwordHash);
    // this.users.push(userEntity);
    // return userEntity;
  }
  async delete(_id: string): Promise<void> {
    const index = this.users.findIndex((user) => user._id() === _id);
    if (index !== -1) {
      this.users.splice(index, 1);
    } else {
      throw new Error("Usuario não encontrado para exclusão");
    }
  }
  async get(): Promise<userEntity[]> {
    return this.users;
  }
  async getOne(_id: string): Promise<userEntity> {
    const user: userEntity = await this.users.find((user: userEntity): boolean => user._id() === _id);
    if (!user) {
      throw new Error(`Nenhum usuario com o id igual a ${_id} foi encontrada`);
    }
    return user;
  }
  login(loginInput: loginInput): Promise<boolean> {
    throw new Error("");
  }
}
