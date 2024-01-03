import { studentEntity } from "../entity/student.entity";
import { studentRepositoryInterface } from "../studentRepository.interface";

export type newStudentInput = {
  name: string;
  age: number;
  course: string;
};
export class saveStudentUsecase {
  constructor(readonly repo: studentRepositoryInterface) {}
  public async execute(newStudentInput: newStudentInput) {
    const student = new studentEntity({
      name: newStudentInput.name,
      age: newStudentInput.age,
      course: newStudentInput.course,
    });
    return await this.repo.save(student);
  }
}
