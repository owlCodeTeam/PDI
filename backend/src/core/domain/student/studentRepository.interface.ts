import { studentEntity } from "./entity/student.entity";
export type updateStudentInput = {
  name: string;
  course: string;
  age: number;
};
export interface studentRepositoryInterface {
  save(student: studentEntity): Promise<studentEntity>;
  get(): Promise<studentEntity[]>;
  getOne(_id: string): Promise<studentEntity>;
  delete(_id: string): Promise<void>;
  update(updateUserInput: updateStudentInput, _id: string);
}
