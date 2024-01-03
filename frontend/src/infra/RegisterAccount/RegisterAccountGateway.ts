export default interface RegisterAccountGateway {
    register(user: object): Promise<any>
}