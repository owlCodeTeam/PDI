export type registerAccountProps = {
    username: string,
    email: string,
    password: string
}

export default class RegisterAccountDataEntity {
    constructor(readonly props:registerAccountProps) {
        //insert validation functions here
    }

    username() {
        return this.props.username
    }

    email() {
        return this.props.email
    }

    password() {
        return this.props.password
    }
}