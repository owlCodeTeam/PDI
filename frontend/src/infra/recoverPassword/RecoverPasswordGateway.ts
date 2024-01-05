export default interface RecoverPasswordGateway {
    getToken(email:string): Promise<any>
    recoverPassword(user:object): Promise<any>
}