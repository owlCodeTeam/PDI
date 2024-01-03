export type userProps = {
  username: string;
  email: string;
  password: string;
  _id: string;
};
export class UserEntity {
  constructor(readonly props: userProps) {
    if (props.email) {
      this.updateEmail(props.email);
    }
  }
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  }
  username(): string {
    return this.props.username;
  }
  email(): string {
    return this.props.email;
  }
  password(): string {
    return this.props.password;
  }
  _id(): string {
    return this.props._id;
  }
  updateUserName(username: string) {
    this.props.username = username;
  }
  updateEmail(email: string) {
    if (!this.isValidEmail(email)) {
      throw new Error("Invalid email");
    }
    this.props.email = email;
  }
}
