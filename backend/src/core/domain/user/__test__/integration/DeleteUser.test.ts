import { userEntity } from "@domain/user/entity/user.entity";
import { DeleteUserUsecase } from "@domain/user/usecases/deleteUser.usecase";
import { userRepositoryMemory } from "@infra/Repositories/Users/userRepository.memory";
import * as crypto from "crypto";
describe("Deve testar o deleteUserUsecase", () => {
  test("Deve deletar um usuario", async () => {
    const repo = new userRepositoryMemory();
    const action = new DeleteUserUsecase(repo);
    const user = new userEntity({
      username: "teste",
      email: "teste@gmail.com",
      password: "1234",
      _id: crypto.randomBytes(8).toString("hex"),
    });
    repo.users.push(user);
    await action.execute(user._id());
    expect(repo.users.length).toBe(0);
  });
});
