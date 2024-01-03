import { updateStudentUsecase } from "@domain/sutdent/usecases/updateStudent.usecase";
import * as crypto from "crypto";
import { studentEntity } from "@domain/sutdent/entity/student.entity";
import { studentRepositoryMemory } from "@infra/Repositories/students/studentRepository.memory";
describe("Testando o caso de uso 'updateStudent'", () => {
  test("Deve editar o estudante", async () => {
    const repo = new studentRepositoryMemory();
    const testStudent: studentEntity = new studentEntity({
      _id: crypto.randomBytes(8).toString("hex"),
      name: "estudanteateste",
      course: "ADS",
      age: 21,
    });
    const newStudent = {
      _id: crypto.randomBytes(8).toString("hex"),
      name: "estudantetesteupdate",
      course: "ADS",
      age: 21,
    };
    repo.students.push(testStudent);
    const action = new updateStudentUsecase(repo);
    const memoryStudent: studentEntity = await action.execute(newStudent, testStudent._id());
    expect(memoryStudent.name()).toBe(newStudent.name);
  });
});
