export type tokenProps = {
    token: string,
}

export default class VerifyAccountTokenEntity {
    constructor(readonly props:tokenProps) {
        this.validateToken()
    }

    validateToken() {
        if (this.props.token.length <= 0) {
            throw new Error('Token inválido')
        } else {
            return true
        }
    }
}