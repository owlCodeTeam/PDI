import { schoolRepositoryMemory } from "@infra/Repositories/Schools/schoolRepository.memory";
import { getOneSchool } from "../../usecases/getOneSchool.usecase";
import { School } from "@domain/school/entity/School.entity.ts";
import * as crypto from "crypto";
describe("Testando o caso de uso 'getOneSchool'", () => {
  test("Deve encontrar uma escola", async () => {
    const repo = new schoolRepositoryMemory();
    const testSchool: School = new School({
      _id: crypto.randomBytes(8).toString("hex"),
      name: "escolateste",
      cep: "23234",
    });
    repo.schools.push(testSchool);
    const action = new getOneSchool(repo);
    const school = action.execute(testSchool._id());
    expect((await school).name()).toBe("escolateste");
  });
});
