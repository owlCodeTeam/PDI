export type recoverPasswordProps = {
    email: string,
    token: string,
    password: string, 
    confirmPassword: string
}

export default class RecoverPasswordDataEntity {
    constructor(readonly props?:recoverPasswordProps) {
        if (props) {
            this.validateToken(this.props.token)
            this.validateEmail(this.props.email)
        }
    }

    validateToken(token:string) {
        if (token.length <= 0) {
            throw new Error('O token não pode estar vazio')
        }
    }

    validateEmail(email:string) {
        if (email.length <= 0) {
            throw new Error('O email não pode estar vazio')
        }
        const regex = /[@]/
        if (!(regex.test(email))) {
            throw new Error('Email inválido')
        }
        if (((email.indexOf('@') <= 0) == true) || (((email.length)-1) == email.indexOf('@') == true)) {
            throw new Error('Email inválido')
        }
    }

    validateNewPassword(password:string, confirmPassword:string) {
        if (password.length <= 0) {
            throw new Error('A senha não pode estar vazia')
        }
        if (password.length < 8) {
            throw new Error('O tamanho minimo da senha deve ser de 8 digitos!')
        }
        if (password != confirmPassword) {
            throw new Error('As senhas devem ser identicas!')
        }
    }
}