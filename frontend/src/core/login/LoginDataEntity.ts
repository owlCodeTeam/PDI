export type loginDataProps = {
    email: string,
    password: string
}

export default class LoginDataEntity {
    constructor(readonly props:loginDataProps) {
        this.validateEmail()
        this.validatePassword()
    }

    email() {
        return this.props.email
    }

    password() {
        return this.props.password
    }

    validateEmail() {
        if (this.email().length <= 0) {
            throw new Error('O campo email não pode estar vazio')
        }
        const regex = /[@]/
        if (!(regex.test(this.email()))) {
            throw new Error('Email inválido')
        }
        if (((this.email().indexOf('@') <= 0) == true) || (((this.email().length)-1) == this.email().indexOf('@') == true)) {
            throw new Error('Email inválido')
        }
    }

    validatePassword() {
        if (this.password().length <= 0) {
            throw new Error('O campo senha não pode estar vazio')
        }
    }
}