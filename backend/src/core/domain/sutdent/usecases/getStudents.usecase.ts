import { studentEntity } from "../entity/student.entity";
import { studentRepositoryInterface } from "../studentRepository.interface";

export class getStudentsUsecase {
  constructor(readonly repo: studentRepositoryInterface) {}
  public async execute(): Promise<studentEntity[]> {
    return await this.repo.get();
  }
}
