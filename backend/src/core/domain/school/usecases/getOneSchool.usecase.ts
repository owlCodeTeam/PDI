import { School } from "../entity/School.entity";
import schoolRepositoryInterface from "@domain/school/schoolRepository.interface";

export class getOneSchool {
  constructor(readonly repo: schoolRepositoryInterface) {}
  public async execute(_id: string): Promise<School> {
    return await this.repo.getOne(_id);
  }
}
