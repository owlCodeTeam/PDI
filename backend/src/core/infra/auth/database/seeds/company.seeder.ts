import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { CompanyModel } from "../models/Company.model";

export class CompanySeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
    const repo = dataSource.getRepository(CompanyModel);
    await repo.createQueryBuilder("companies").delete().execute();
    const companies = [
      {
        uuid: "013b6d7a-eb0e-42ee-9918-8335a82f1fd9",
        name: "Empresa teste 01",
        cpf_cnpj: "00000000000001",
        cns: "000001",
        email: "empresa01@email.com",
      },
      {
        uuid: "023b6d7a-eb0e-42ee-9918-8335a82f1fd9",
        name: "Empresa teste 02",
        cpf_cnpj: "00000000000002",
        cns: "000002",
        email: "empresa02@email.com",
      },
    ];
    await repo.insert(companies);
  }
}
