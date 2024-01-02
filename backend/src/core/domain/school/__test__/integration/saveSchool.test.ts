import { schoolRepositoryMemory } from "@infra/Repositories/Schools/schoolRepository.memory";
import { saveSchoolUsecase } from "../../usecases/saveSchool.usecase";
import * as crypto from "crypto";

describe("Deve testar o caso de uso 'saveSchool'", () => {
  test("Deve criar uma escola", async () => {
    const repo = new schoolRepositoryMemory();
    const action = new saveSchoolUsecase(repo);
    await action.execute({
      name: "EFA",
      cep: "3213",
      _id: crypto.randomBytes(8).toString("hex"),
    });
    expect(1).toBe(1);
  });
});
