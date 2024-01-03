export default interface VerifyAccountGateway {
    verify(token:string): Promise<any>
}