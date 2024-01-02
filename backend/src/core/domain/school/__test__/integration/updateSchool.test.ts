import { schoolRepositoryMemory } from "@infra/Repositories/Schools/schoolRepository.memory";
import { updateSchool } from "@domain/school/usecases/updateSchool.usecase.ts";
import { School } from "@domain/school/entity/School.entity.ts";
import * as crypto from "crypto";
describe("Testando o caso de uso 'updateSchool'", () => {
  test("Deve editar a escola", async () => {
    const repo = new schoolRepositoryMemory();
    const testSchool: School = new School({
      _id: crypto.randomBytes(8).toString("hex"),
      name: "escolateste",
      cep: "23234",
    });
    const newSchool = {
      _id: crypto.randomBytes(8).toString("hex"),
      name: "escolatesteupdate",
      cep: "23234",
    };
    repo.schools.push(testSchool);
    const action = new updateSchool(repo);
    const memorySchool: School = await action.execute(newSchool, testSchool._id());
    expect(memorySchool.name()).toBe(newSchool.name);
  });
});
