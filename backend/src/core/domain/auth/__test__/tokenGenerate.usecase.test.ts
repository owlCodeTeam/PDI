import { userEntity } from "@core/domain/auth/entity/user.entity.ts";
import { GenerateTokenUsecase } from "@core/domain/auth/usecase/tokenGenerate.usecase.ts";

describe("Testando TokenGenerateUsecase", () => {
  test("Deve gerar um token de autenticacao", async () => {
    const action = new GenerateTokenUsecase();
    const user = new userEntity({
      email: "teste@gmail.com",
      password: "123",
    });
    const response = await action.execute(user);

    expect(response.token).toBe("abc");
  });
});
