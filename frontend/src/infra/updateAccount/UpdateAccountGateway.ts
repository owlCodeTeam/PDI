export default interface UpdateAccountGateway {
    update(user:object, id:string): Promise<any>
}