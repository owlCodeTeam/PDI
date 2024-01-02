import { schoolRepositoryMemory } from "@infra/Repositories/Schools/schoolRepository.memory";
import { getSchools } from "@domain/school/usecases/getSchools.usecase.ts";
import { School } from "@domain/school/entity/School.entity.ts";
import * as crypto from "crypto";
describe("Testando o caso de uso 'getSchools'", () => {
  test("Deve encontrar todas escolas", async () => {
    const repo = new schoolRepositoryMemory();
    const testSchool: School = new School({
      _id: crypto.randomBytes(8).toString("hex"),
      name: "escolateste",
      cep: "23234",
    });
    repo.schools.push(testSchool);
    const action = new getSchools(repo);
    const Schools: School[] = await action.execute(testSchool._id());
    expect(Schools.length).toBe(1);
  });
});
