import { userEntity } from "@domain/user/entity/user.entity";
import { GetOneUserUsecase } from "@domain/user/usecases/getOneUser.usecase";
import { userRepositoryMemory } from "@infra/Repositories/Users/userRepository.memory";
import * as crypto from "crypto";
describe("Deve testar o getOneUsecase", () => {
  test("Deve achar um usuario", async () => {
    const repo = new userRepositoryMemory();
    const action = new GetOneUserUsecase(repo);
    const user = new userEntity({
      username: "teste",
      email: "teste@gmail.com",
      password: "1234",
      _id: crypto.randomBytes(8).toString("hex"),
    });
    repo.users.push(user);
    const userResponse = await action.execute(user._id());
    expect(userResponse.username()).toBe("teste");
  });
});
