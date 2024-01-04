import { saveUserUsecase } from "@domain/user/usecases/save.usecase";
import { AuthGatewayLocal } from "@infra/auth/authGateway.local";
import { AuthRepositoryTypeorm } from "@infra/auth/authRepository.typeorm";
import dataSource from "@infra/shared/database/datasource";
import { UserModel } from "@infra/auth/database/models/User.model";
import { emailGatewayLocal } from "@infra/user/emailGateway.gateway";
describe("Deve testar o saveUserUsecase", () => {
  beforeAll(async () => {
    await dataSource.initialize();
  });
  afterAll(async () => {
    await dataSource.destroy();
  });
  test("Deve criar um usuario no banco de dados", async () => {
    const repo = new AuthGatewayLocal(dataSource);
    const gateway = new AuthRepositoryTypeorm(dataSource);
    const emailGateway = new emailGatewayLocal();
    const action = new saveUserUsecase(gateway, repo, emailGateway);
    const userInput = {
      username: "userTeste",
      password: "123456",
      email: "usuario01@email.com",
      cpf: "111.111.111-11",
    };
    const userResponseSignUp = await action.execute(userInput);
    const userDb = await dataSource
      .getRepository(UserModel)
      .createQueryBuilder()
      .where("uuid = :uuid", { uuid: userResponseSignUp.uuid() })
      .getOne();
    await dataSource
      .createQueryBuilder()
      .delete()
      .from(UserModel)
      .where("uuid = :uuid", { uuid: userResponseSignUp.uuid() })
      .execute();
    expect(userDb.name).toBe(userInput.username);
  });
});
