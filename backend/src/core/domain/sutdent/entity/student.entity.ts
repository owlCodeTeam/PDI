export type studentProps = {
  name: string;
  course: string;
  age: number;
  _id?: string;
};
export class studentEntity {
  constructor(readonly props: studentProps) {}
  name(): string {
    return this.props.name;
  }
  course(): string {
    return this.props.course;
  }
  age(): number {
    return this.props.age;
  }
  _id(): string {
    return this.props._id;
  }
  updateName(name: string) {
    this.props.name = name;
  }
  updateCourse(course: string) {
    this.props.course = course;
  }
  updateAge(age: number) {
    this.props.age = age;
  }
}
