import schoolRepositoryInterface from "@core/";
import { School } from "@core/domain/school/entity/School.entity.ts";

export class getSchools {
  constructor(readonly repo: schoolRepositoryInterface) {}
  public async execute(): Promise<School[]> {
    return await this.repo.get();
  }
}