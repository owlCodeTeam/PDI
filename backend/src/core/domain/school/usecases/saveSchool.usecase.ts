import { School } from '../entity/School.entity';
import schoolRepositoryInterface from '../schoolRepository.interface';
export type newSchoolInput = {
  _id?: string;
  name: string;
  cep: string;
};

export class saveSchoolUsecase {
  constructor(readonly repo: schoolRepositoryInterface) {}
  public async execute(school: newSchoolInput): Promise<School> {
    const schoolEntity = new School({
      name: school.name,
      cep: school.cep,
      _id: school._id,
    });
    return await this.repo.save(schoolEntity);
  }
}
