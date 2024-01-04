export type loginDataProps = {
    username: string,
    password: string
}

export default class LoginDataEntity {
    constructor(readonly props:loginDataProps) {
        this.validateUsername()
        this.validatePassword()
    }

    username() {
        return this.props.username
    }

    password() {
        return this.props.password
    }

    getData() {
        return this.props
    }

    validateUsername() {
        if (this.username().length <= 0) {
            throw new Error('O campo username não pode estar vazio')
        }
        const regex = /[@]/
        if (!(regex.test(this.username()))) {
            throw new Error('Username inválido')
        }
        if (((this.username().indexOf('@') <= 0) == true) || (((this.username().length)-1) == this.username().indexOf('@') == true)) {
            throw new Error('Username inválido')
        }
    }

    validatePassword() {
        if (this.password().length <= 0) {
            throw new Error('O campo senha não pode estar vazio')
        }
    }
}