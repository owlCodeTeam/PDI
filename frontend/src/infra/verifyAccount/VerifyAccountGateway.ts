export default interface VerifyAccountGateway {
    verify(token:string): Promise<any>
    newEmailRequest(email:string): Promise<any>
}