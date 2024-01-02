import schoolRepositoryInterface from "@domain/school/schoolRepository.interface";

export class deleteSchool {
  constructor(readonly repo: schoolRepositoryInterface) {}
  public async execute(_id: string): Promise<void> {
    await this.repo.delete(_id);
  }
}
