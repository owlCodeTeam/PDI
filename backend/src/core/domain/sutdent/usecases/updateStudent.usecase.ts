import { studentEntity } from "../entity/student.entity";
import { studentRepositoryInterface } from "../studentRepository.interface";
export type updateStudentInput = {
  name: string;
  age: number;
  course: string;
};
export class updateStudentUsecase {
  constructor(readonly repo: studentRepositoryInterface) {}
  public async execute(updateStudentInput: updateStudentInput, _id: string): Promise<studentEntity> {
    return await this.repo.update(updateStudentInput, _id);
  }
}
