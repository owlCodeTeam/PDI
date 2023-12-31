import { AuthGatewayLocal } from "@infra/auth/authGateway.local";
import { GenerateTokenUsecase } from "@domain/auth/usecase/generateToken.usecase";
import dataSource from "@infra/shared/database/datasource";
import { AuthRepositoryTypeorm } from "@infra/auth/authRepository.typeorm";

describe("Testando TokenGenerateUsecase", () => {
  beforeAll(async () => {
    await dataSource.initialize();
  });

  afterAll(async () => {
    await dataSource.destroy();
  });
  test.skip("Deve gerar um token de autenticacao", async () => {
    const repo = new AuthRepositoryTypeorm(dataSource);
    const gateway = new AuthGatewayLocal(dataSource);
    const action = new GenerateTokenUsecase(repo, gateway);

    const response = await action.execute({
      username: "joaopleseux@gmail.com",
      password: "123456",
    });

    expect(response.length > 10).toBe(true);
  });

  test("Deve gerar erro usuario não encontrado", async () => {
    const repo = new AuthRepositoryTypeorm(dataSource);
    const gateway = new AuthGatewayLocal(dataSource);
    const usecase = new GenerateTokenUsecase(repo, gateway);

    await expect(async () => {
      await usecase.execute({
        username: "usuario",
        password: "123456",
      });
    }).rejects.toThrow("Usuario não encontrado");
  });

  test("Deve gerar erro senha incorreta", async () => {
    const repo = new AuthRepositoryTypeorm(dataSource);
    const gateway = new AuthGatewayLocal(dataSource);
    const usecase = new GenerateTokenUsecase(repo, gateway);

    await expect(async () => {
      await usecase.execute({
        username: "joaopleseux@gmail.com",
        password: "123",
      });
    }).rejects.toThrow("Senha inválida");
  });
  test("Deve gerar um novo token a um usuario não autenticado para a verificação da conta", async () => {
    const repo = new AuthRepositoryTypeorm(dataSource);
    const gateway = new AuthGatewayLocal(dataSource);
    const action = new GenerateTokenUsecase(repo, gateway);

    const response = await action.execute({
      username: "joaopleseux@gmail.com",
    });

    expect(response.length > 10).toBe(true);
  });
});
