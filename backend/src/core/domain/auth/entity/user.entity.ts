export type userProps = {
  email: string;
  password: string;
};
export class userEntity {
  constructor(readonly props: userProps) {}
  email(): string {
    return this.props.email;
  }
  password(): string {
    return this.props.password;
  }
}
