import { stub } from "sinon";
import { loginUsecase } from "@domain/auth/usecase/login.usecase";
import { authGatewayLocal } from "@infra/auth/authGateway.local";

describe("Deve testar LoginUsecase", () => {
  test.skip("Deve autenticar User", async () => {
    const gateway = new authGatewayLocal();
    const signStub = stub(authGatewayLocal.prototype, "sign");
    signStub.resolves("abc123");

    const usecase = new loginUsecase(gateway);
    const response = await usecase.execute({
      username: "abc",
      password: "123",
    });

    expect(response).toBe();
  });
});
