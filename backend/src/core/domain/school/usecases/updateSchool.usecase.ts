import { School } from "@core/domain/school/entity/School.entity.ts";
import schoolRepositoryInterface from "@core/domain/school/schoolRepository.interface.ts";
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
