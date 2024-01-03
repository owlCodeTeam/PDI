export type recoverPasswordProps = {
    email: string,
    token: string
}

export default class RecoverPasswordDataEntity {
    constructor(readonly props:recoverPasswordProps) {
        this.validateToken()
        this.validateEmail()
    }

    email() {
        return this.props.email
    }

    token() {
        return this.props.token
    }

    validateToken() {
        if (this.token().length <= 0) {
            throw new Error('O token não pode estar vazio')
        }
    }

    validateEmail() {
        if (this.email().length <= 0) {
            throw new Error('O email não pode estar vazio')
        }
        const regex = /[@]/
        if (!(regex.test(this.email()))) {
            throw new Error('Email inválido')
        }
        if (((this.email().indexOf('@') <= 0) == true) || (((this.email().length)-1) == this.email().indexOf('@') == true)) {
            throw new Error('Email inválido')
        }
    }
}