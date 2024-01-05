import { userEntity } from "@domain/auth/entity/user.entity";
import { GenerateTokenUsecase } from "@domain/auth/usecase/generateToken.usecase";
import { passwordRecoveryUsecase } from "@domain/auth/usecase/passwordRecovery.usecase";
import { AuthGatewayLocal } from "@infra/auth/authGateway.local";
import { AuthRepositoryTypeorm } from "@infra/auth/authRepository.typeorm";
import { UserModel } from "@infra/auth/database/models/User.model";
import dataSource from "@infra/shared/database/datasource";

describe("Deve testar o passwordRecoveryUsecase", () => {
  beforeAll(async () => {
    await dataSource.initialize();
  });
  afterAll(async () => {
    await dataSource.destroy();
  });
  test("Deve gerar uma nova senha", async () => {
    const repo = new AuthGatewayLocal(dataSource);
    const gateway = new AuthRepositoryTypeorm(dataSource);
    const passwordRecovery = new passwordRecoveryUsecase(gateway, repo);
    const action = new GenerateTokenUsecase(gateway, repo);
    const token = await action.execute({ username: "usuario01@email.com" });
    const passwordrecoveryInput = {
      token: token,
      newPassword: "1234567890",
    };
    await passwordRecovery.execute(passwordrecoveryInput);
    const userDb = await dataSource
      .getRepository(UserModel)
      .createQueryBuilder()
      .where("email = :email", { email: "usuario01@email.com" })
      .getOne();
    const user = new userEntity({
      uuid: userDb.uuid,
      name: userDb.name,
      email: userDb.email,
      password: userDb.password,
      cpf: userDb.cpf,
      is_verify: userDb.is_verify,
    });
    expect(await repo.validatePassword(user, passwordrecoveryInput.newPassword)).toBe(true);
  });
});
