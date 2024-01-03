import { studentEntity } from "@domain/sutdent/entity/student.entity";
import { studentRepositoryInterface, updateStudentInput } from "@domain/sutdent/studentRepository.interface";

export class studentRepositoryMemory implements studentRepositoryInterface {
  public students: studentEntity[] = [];
  async save(student: studentEntity): Promise<studentEntity> {
    await this.students.push(student);
    return student;
  }
  async get(): Promise<studentEntity[]> {
    return this.students;
  }
  async getOne(_id: string): Promise<studentEntity> {
    const student: studentEntity = await this.students.find((student) => student._id() === _id);
    if (!student) {
      throw new Error(`Nenhum estudante com o id igual a ${_id} foi encontrada`);
    }
    return student;
  }
  async delete(_id: string): Promise<void> {
    const index = this.students.findIndex((student) => student._id() === _id);
    if (index !== -1) {
      this.students.splice(index, 1);
    } else {
      throw new Error("Estudante não encontrado para exclusão");
    }
  }
  async update(updateUserInput: updateStudentInput, _id: string) {
    const school: studentEntity = await this.getOne(_id);
    school.updateAge(updateUserInput.age);
    school.updateCourse(updateUserInput.course);
    school.updateName(updateUserInput.name);
    return school;
  }
}
