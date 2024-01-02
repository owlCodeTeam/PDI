import { School } from "./entity/School.entity";

export type updateSchoolInput = {
  name: string;
  cep: string;
};
export default interface schoolRepositoryInterface {
  save(newSchool: School): Promise<School>;
  get(): Promise<School[]>;
  getOne(_id: string): Promise<School>;
  delete(_id: string): Promise<void>;
  update(updateInput: updateSchoolInput, _id: string): Promise<School>;
}
