
import { authGatewayLocal } from "@infra/auth/authGateway.local.ts";
import { userEntity } from "@domain/auth/entity/user.entity.ts";
import { GenerateTokenUsecase } from "@domain/auth/usecase/tokenGenerate.usecase.ts";

describe("Testando TokenGenerateUsecase", () => {
  test("Deve gerar um token de autenticacao", async () => {
    const gateway = new authGatewayLocal("2321223231");
    const action = new GenerateTokenUsecase(gateway);
    const user = new userEntity({
      email: "teste@gmail.com",
      password: "123",
    });
    const response = await action.execute(user);
    expect(response.length > 10).toBe(true);
  });
});
