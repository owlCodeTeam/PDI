import schoolRepositoryInterface from "@core/domain/school/schoolRepository.interface,ts";

export class deleteSchool {
  constructor(readonly repo: schoolRepositoryInterface) {}
  public async execute(_id: string): Promise<void> {
    await this.repo.delete(_id);
  }
}
