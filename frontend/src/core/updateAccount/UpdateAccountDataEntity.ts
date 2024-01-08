export type updateAccountProps = {
    username: string,
    email: string,
}

export default class UpdateAccountDataEntity {
    constructor(readonly props:updateAccountProps) {
        this.validateName()
        this.validateEmail()
    }
    
    username() {
        return this.props.username
    }

    email() {
        return this.props.email
    }

    getData() {
        return this.props
    }

    validateName() {
        if (this.username().length <= 0){
            throw new Error('O nome de usuário não pode estar vazio')
        }
        const regex = /^[A-Za-z ]+$/
        if (!(regex.test(this.username()))) {
            throw new Error('O nome de usuário não pode conter números ou caracteres especiais')
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