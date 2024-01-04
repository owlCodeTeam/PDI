export type registerAccountProps = {
    username: string,
    email: string,
    password: string,
    cpf: string
}

export default class RegisterAccountDataEntity {
    constructor(readonly props:registerAccountProps, confirmPassword:string) {
        this.validateName()
        this.validateEmail()
        this.validatePassword(confirmPassword)
        this.validateCpf()
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

    cpf() {
        return this.props.cpf
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

    validatePassword(confirmPassword:string) {
        if (this.password().length < 8) {
            throw new Error('A senha deve conter no minímo 8 caracteres')
        }
        if (this.password() != confirmPassword) {
            throw new Error('Senhas diferentes. Digite a mesma senha em ambos os campos de senha')
        }
    }

    validateCpf() {
        if (this.cpf().length <= 0) {
            throw new Error('O campo CPF não pode estar vazio')
        }
        if (this.cpf().length != 14) {
            throw new Error('CPF inválido')
        }
    }
}