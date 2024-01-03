import { studentRepositoryMemory } from "@infra/Repositories/students/studentRepository.memory";
import { studentEntity } from "@domain/sutdent/entity/student.entity";
import { getOneStudentUsecase } from "@domain/sutdent/usecases/gteOneStudent.usecase";
import * as crypto from "crypto";
describe("Testando o caso de uso 'getOneStudent'", () => {
  test("Deve encontrar uma estudante", async () => {
    const repo = new studentRepositoryMemory();
    const testStudent: studentEntity = new studentEntity({
      _id: crypto.randomBytes(8).toString("hex"),
      name: "estudanteteste",
      course: "TI",
      age: 35,
    });
    repo.students.push(testStudent);
    const action = new getOneStudentUsecase(repo);
    const student = action.execute(testStudent._id());
    expect((await student).name()).toBe("estudanteteste");
  });
});
