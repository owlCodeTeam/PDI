import { studentEntity } from "@domain/sutdent/entity/student.entity";
import { saveStudentUsecase } from "@domain/sutdent/usecases/saveStudent.usecase";
import { studentRepositoryMemory } from "@infra/Repositories/students/studentRepository.memory";
import * as crypto from "crypto";
describe("Deve testar o usecase saveStudent", () => {
  test("Deve criar um novo estudante", async () => {
    const repo = new studentRepositoryMemory();
    const action = new saveStudentUsecase(repo);
    const student = new studentEntity({
      name: "Julio",
      age: 21,
      course: "TI",
      _id: crypto.randomBytes(8).toString("hex"),
    });
    const studentResponse = await action.execute(student.props);
    return studentResponse;
  });
});
