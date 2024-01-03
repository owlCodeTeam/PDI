import { getStudentsUsecase } from "@domain/student/usecases/getStudents.usecase";
import * as crypto from "crypto";
import { studentEntity } from "@domain/student/entity/student.entity";
import { studentRepositoryMemory } from "@infra/Repositories/students/studentRepository.memory";
describe("Testando o caso de uso 'getStudents'", () => {
  test("Deve encontrar todas escolas", async () => {
    const repo = new studentRepositoryMemory();
    const testStudent: studentEntity = new studentEntity({
      _id: crypto.randomBytes(8).toString("hex"),
      name: "escolateste",
      course: "Ti",
      age: 17,
    });
    repo.students.push(testStudent);
    const action = new getStudentsUsecase(repo);
    const Students: studentEntity[] = await action.execute();
    expect(Students.length).toBe(1);
  });
});
