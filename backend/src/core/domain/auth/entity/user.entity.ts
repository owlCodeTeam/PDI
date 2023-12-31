export type userProps = {
  uuid: string;
  name: string;
  email: string;
  password: string;
  cpf: string;
  is_verify?: boolean;
};
export class userEntity {
  constructor(readonly props: userProps) {}

  uuid(): string {
    return this.props.uuid;
  }
  password(): string {
    return this.props.password;
  }
  is_verify(): boolean {
    return this.props.is_verify;
  }
  name(): string {
    return this.props.name;
  }
  cpf(): string {
    return this.props.cpf;
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
