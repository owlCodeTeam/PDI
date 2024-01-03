import { studentEntity } from "../entity/student.entity";
import { studentRepositoryInterface } from "../studentRepository.interface";

export class getOneStudentUsecase {
  constructor(readonly repo: studentRepositoryInterface) {}
  public async execute(_id: string): Promise<studentEntity> {
    return await this.repo.getOne(_id);
  }
}
