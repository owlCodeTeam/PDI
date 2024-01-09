import { GenerateTokenUsecase } from "@domain/auth/usecase/generateToken.usecase";
import { verifyAccountUsecase } from "@domain/auth/usecase/verifyAccount.usecase";
import { AuthGatewayLocal } from "@infra/auth/authGateway.local";
import { AuthRepositoryTypeorm } from "@infra/auth/authRepository.typeorm";
import { UserModel } from "@infra/auth/database/models/User.model";
import dataSource from "@infra/shared/database/datasource";

describe("Deve testar o verifyAccountUsecase", () => {
  beforeAll(async () => {
    await dataSource.initialize();
  });
  afterAll(async () => {
    await dataSource
      .createQueryBuilder()
      .update(UserModel)
      .set({ is_verify: false })
      .where("email = :email ", { email: "joaopleseux@gmail.com" })
      .execute();
    await dataSource.destroy();
  });
  test("Deve verificar uma conta", async () => {
    const repo = new AuthGatewayLocal(dataSource);
    const gateway = new AuthRepositoryTypeorm(dataSource);
    const generateToken = new GenerateTokenUsecase(gateway, repo);
    const action = new verifyAccountUsecase(gateway, repo);
    const token = await generateToken.execute({ username: "joaopleseux@gmail.com" });
    await action.execute(token);
    const userDb = await dataSource
      .getRepository(UserModel)
      .createQueryBuilder()
      .where("email = :email", { email: "joaopleseux@gmail.com" })
      .getOne();
    expect(userDb.is_verify).toBe(true);
  });
});
//  joaopleseux@gmail.com
