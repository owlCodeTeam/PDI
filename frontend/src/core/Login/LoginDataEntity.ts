export type LoginDataProps = {
    email: string,
    password: string
}

export default class LoginDataEntity {
    constructor(readonly props:LoginDataProps) {
        //insert validation functions here
    }

    email() {
        return this.props.email
    }

    passwword() {
        return this.props.password
    }
}