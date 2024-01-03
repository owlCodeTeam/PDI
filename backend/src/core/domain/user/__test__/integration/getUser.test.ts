import { userEntity } from "@domain/user/entity/user.entity";
import { getUsersUsecase } from "@domain/user/usecases/getUsers.usecase";
import { userRepositoryMemory } from "@infra/Repositories/Users/userRepository.memory";
import * as crypto from "crypto";
describe("Deve testar o getUserUsecase", () => {
  test("Deve achar um usuario com base no id", async () => {
    const repo = new userRepositoryMemory();
    const action = new getUsersUsecase(repo);
    const user = new userEntity({
      username: "teste",
      email: "teste@gmail.com",
      password: "1234",
      _id: crypto.randomBytes(8).toString("hex"),
    });
    repo.users.push(user);
    const users = await action.execute();
    expect(users.length).toBe(1);
  });
});
