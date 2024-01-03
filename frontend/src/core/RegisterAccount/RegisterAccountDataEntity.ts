export type registerAccountProps = {
    name: string,
    email: string,
    password: string
}

export default class RegisterAccountDataEntity {
    constructor(readonly props:registerAccountProps) {
        //insert validation functions here
    }

    name() {
        return this.props.name
    }

    email() {
        return this.props.email
    }

    password() {
        return this.props.password
    }
}