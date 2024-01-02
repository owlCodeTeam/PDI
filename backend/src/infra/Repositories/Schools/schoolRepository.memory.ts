import { error } from "console";
import { School } from "../../../core/domain/school/entity/School.entity";
import schoolRepositoryInterface, { updateSchoolInput } from "../../../core/domain/school/schoolRepository.interface";

export class schoolRepositoryMemory implements schoolRepositoryInterface {
  public schools: School[] = [];
  async save(newSchool: School): Promise<School> {
    this.schools.push(newSchool);
    return newSchool;
  }
  async getOne(_id: string): Promise<School> {
    const school: School = await this.schools.find((school: School): boolean => school._id() === _id);
    if (!school) {
      throw new error(`Nenhuma escola com o id igual a ${_id} foi encontrada`);
    }
    return school;
  }
  async get(): Promise<School[]> {
    return this.schools;
  }
  async delete(_id: string): Promise<void> {
    await this.getOne(_id);
  }
  async update(updateInput: updateSchoolInput, _id: string): Promise<School> {
    const school = await this.getOne(_id);
    school.updateCep(updateInput.cep);
    school.updateName(updateInput.name);
    return school;
  }
}
