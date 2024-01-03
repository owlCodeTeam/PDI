export default interface LoginGateway {
    login(user: object): Promise<any>
}