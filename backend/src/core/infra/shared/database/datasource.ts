require("dotenv").config();
import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";
import { join } from "path";
import { MainSeeder } from "./main.seeder";

const options: DataSourceOptions & SeederOptions = {
  type: process.env.DB_DRIVE as any,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as any,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  schema: process.env.DB_DEFAULT_SCHEMA ?? "public",
  password: process.env.DB_PASSWORD,
  synchronize: false,
  logging: false,
  entities: [join(process.cwd(), "/src/**/*.model.{ts,js}")],
  seeds: [MainSeeder],
  migrations: [join(process.cwd(), "/src/**/*.migration.{ts,js}")],
};

const dataSource = new DataSource(options);

export default dataSource;
