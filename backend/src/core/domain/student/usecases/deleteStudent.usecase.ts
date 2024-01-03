import { studentRepositoryInterface } from "../studentRepository.interface";

export class deleteStudentUsecase {
  constructor(readonly repo: studentRepositoryInterface) {}
  public async execute(_id: string): Promise<void> {
    await this.repo.delete(_id);
  }
}
