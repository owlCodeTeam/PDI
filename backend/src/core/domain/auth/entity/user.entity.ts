export type userProps = {
  uuid: string;
  name: string;
  email: string;
};
export class UserEntity {
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

  payloadToken() {
    const payload: any = {
      uuid: this.props.uuid,
      name: this.props.name,
      email: this.props.email,
    };

    return payload;
  }
}
