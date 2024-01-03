import { stub } from "sinon";
import { authGatewayLocal } from "@infra/auth/authGateway.local";
import { GenerateTokenUsecase } from "@domain/auth/usecase/tokenGenerate.usecase";

describe("Testando TokenGenerateUsecase", () => {
  test("Deve gerar um token de autenticacao", async () => {
    const gateway = new authGatewayLocal("2321223231");
    const signStub = stub(authGatewayLocal.prototype, "sign");
    signStub.resolves("ABC123");

    const action = new GenerateTokenUsecase(gateway);

    const response = await action.execute({
      username: "teste@gmail.com",
      password: "123",
    });

    expect(response).toBe("ABC123");
  });
});
