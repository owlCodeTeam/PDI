import schoolRepositoryInterface from "@domain/school/schoolRepository.interface";
import { School } from "@domain/school/entity/School.entity";

export class getSchools {
  constructor(readonly repo: schoolRepositoryInterface) {}
  public async execute(): Promise<School[]> {
    return await this.repo.get();
  }
}
