import { error } from "console";
import { School } from "@domain/school/entity/School.entity";
import schoolRepositoryInterface, { updateSchoolInput } from "@domain/school/schoolRepository.interface";

export class schoolRepositoryMemory implements schoolRepositoryInterface {
  public schools: School[] = [];
  async save(newSchool: School): Promise<School> {
    this.schools.push(newSchool);
    return newSchool;
  }
  async getOne(_id: string): Promise<School> {
    const school: School = await this.schools.find((school) => school._id() === _id);
    if (!school) {
      throw new error(`Nenhuma escola com o id igual a ${_id} foi encontrada`);
    }
    return school;
  }
  async get(): Promise<School[]> {
    return this.schools;
  }
  async delete(_id: string): Promise<void> {
    const index = this.schools.findIndex((school) => school._id() === _id);
    if (index !== -1) {
      this.schools.splice(index, 1);
    } else {
      throw new Error("Escola não encontrada para exclusão");
    }
  }
  async update(updateInput: updateSchoolInput, _id: string): Promise<School> {
    const school = await this.getOne(_id);
    await school.updateCep(updateInput.cep);
    await school.updateName(updateInput.name);
    return school;
  }
}
