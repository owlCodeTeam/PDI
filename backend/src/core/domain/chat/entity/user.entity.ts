export type userProps = {
  uuid: string;
  name: string;
  email: string;
};
export class userEntity {
  constructor(readonly props: userProps) {}

  uuid(): string {
    return this.props.uuid;
  }
  name(): string {
    return this.props.name;
  }
  email(): string {
    return this.props.email;
  }
  update_email(email: string) {
    this.props.email = email;
  }
  update_name(name: string) {
    this.props.name = name;
  }
  update_uuid(uuid: string) {
    this.props.uuid = uuid;
  }
}
