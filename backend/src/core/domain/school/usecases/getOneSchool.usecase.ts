import { School } from "../entity/School.entity";
import schoolRepositoryInterface from "@core/";

export class getOneSchool {
  constructor(readonly repo: schoolRepositoryInterface) {}
  public async execute(_id: string): Promise<School> {
    return await this.repo.getOne(_id);
  }
}
