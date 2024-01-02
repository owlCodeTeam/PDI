export type schoolProps = {
  _id?: string;
  name: string;
  cep: string;
};
export class School {
  constructor(readonly props: schoolProps) {}
  name(): string {
    return this.props.name;
  }
  _id(): string {
    return this.props._id;
  }
  cep(): string {
    return this.props.cep;
  }
  updateCep(cep: string): void {
    this.props.cep = cep;
  }
  updateName(name: string): void {
    this.props.name = name;
  }
}
