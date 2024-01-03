import * as crypto from "crypto";
import { deleteStudentUsecase } from "@domain/student/usecases/deleteStudent.usecase";
import { studentEntity } from "@domain/student/entity/student.entity";
import { studentRepositoryMemory } from "@infra/Repositories/students/studentRepository.memory";
describe("Testando o caso de uso 'deleteStudent'", () => {
  test("Deve deletar uma Student", async () => {
    const repo = new studentRepositoryMemory();
    const testStudent: studentEntity = new studentEntity({
      _id: crypto.randomBytes(8).toString("hex"),
      name: "Studentteste",
      course: "TI",
      age: 34,
    });
    repo.students.push(testStudent);
    const action = new deleteStudentUsecase(repo);
    await action.execute(testStudent._id());
    expect(repo.students.length).toBe(0);
  });
});
