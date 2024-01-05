export type recoverPasswordProps = {
    email: string,
    token: string,
    password: string, 
    confirmPassword: string
}

export default class RecoverPasswordDataEntity {
    constructor(readonly props?:recoverPasswordProps) {
        if (props) {
            this.validateToken(this.props.email)
            this.validateEmail(this.props.token)
        }
    }

    validateToken(token:string) {
        if (token.length <= 0) {
            throw new Error('O campo token não pode estar vazio')
        }
    }

    validateEmail(email:string) {
        if (email.length <= 0) {
            throw new Error('O campo email não pode estar vazio')
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
            throw new Error('O campo email não pode estar vazio')
        }
        if (password.length < 8) {
            throw new Error('O tamanho minimo da senha deve ser de 8 digitos!')
        }
        if (password != confirmPassword) {
            throw new Error('As senhas devem ser identicas!')
        }
    }
}