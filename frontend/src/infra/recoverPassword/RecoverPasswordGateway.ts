export default interface RecoverPasswordGateway {
    sendEmail(email:string): Promise<any>
    sendToken(token:string): Promise<any>
}