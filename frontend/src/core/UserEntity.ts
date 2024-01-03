export type userProps = {
    email: string, // username
    password: string
}
export default class UserEntity {
    constructor(readonly props: userProps) {
        this.validatePassword()
    }

    email() {
        return this.props.email
    }

    passsword() {
        return this.props.password
    }

    validatePassword() {
        if (this.props.password.length < 6) {
            throw new Error('Senha pequena')
        }
    }
}