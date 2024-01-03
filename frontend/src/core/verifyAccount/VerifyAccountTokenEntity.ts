export type tokenProps = {
    token: string,
}

export default class VerifyAccountTokenEntity {
    constructor(readonly props:tokenProps) {}

    data() {
        return this.props.token
    }

    validateSession(props:any) {
        if (localStorage.getItem('user-email') === props) {
            return true
        } else {
            return false
        }
    }

    validateToken() {
        if (this.props.token.length <= 0) {
            throw new Error('Token inválido')
        } else {
            return true
        }
    }
}