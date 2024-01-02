import { schoolRepositoryMemory } from "@infra/Repositories/Schools/schoolRepository.memory";
import { School } from "@domain/school/entity/School.entity.ts";
import * as crypto from "crypto";
import { deleteSchool } from "@domain/school/usecases/deleteSchool.usecase.ts";
describe("Testando o caso de uso 'deleteSchool'", () => {
  test("Deve deletar uma escola", async () => {
    const repo = new schoolRepositoryMemory();
    const testSchool: School = new School({
      _id: crypto.randomBytes(8).toString("hex"),
      name: "escolateste",
      cep: "23234",
    });
    repo.schools.push(testSchool);
    const action = new deleteSchool(repo);
    await action.execute(testSchool._id());
    expect(repo.schools.length).toBe(0);
  });
});
