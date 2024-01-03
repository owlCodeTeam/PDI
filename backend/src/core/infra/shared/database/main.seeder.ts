import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager, runSeeder } from "typeorm-extension";
import { CompanySeeder } from "../../auth/database/seeds/company.seeder";
import { UserSeeder } from "../../auth/database/seeds/user.seeder";

export class MainSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    await runSeeder(dataSource, CompanySeeder);
    await runSeeder(dataSource, UserSeeder);
  }
}
