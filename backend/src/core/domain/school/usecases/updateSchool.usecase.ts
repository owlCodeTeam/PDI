import { School } from "@domain/school/entity/School.entity";
import schoolRepositoryInterface from "@domain/school/schoolRepository.interface";
export type updateSchoolInput = {
  name: string;
  cep: string;
};
export class updateSchool {
  constructor(readonly repo: schoolRepositoryInterface) {}
  public async execute(newSchool: updateSchoolInput, _id: string): Promise<School> {
    return await this.repo.update(newSchool, _id);
  }
}
