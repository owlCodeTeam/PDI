import { saveUserUsecase } from "@domain/user/usecases/saveUser.usecase";
import { userRepositoryMemory } from "@infra/Repositories/Users/userRepository.memory";
import * as crypto from "crypto";
describe("Deve testar o saveUserUsecase", () => {
  test.skip("Deve criar um novo usuario", async () => {
    const repo = new userRepositoryMemory();
    const action = new saveUserUsecase(repo);
    const user = {
      username: "teste",
      email: "teste@gmail.com",
      password: "1234",
      _id: crypto.randomBytes(8).toString("hex"),
    };
    await action.execute(user);
    expect(repo.users.length).toBe(1);
  });
});
