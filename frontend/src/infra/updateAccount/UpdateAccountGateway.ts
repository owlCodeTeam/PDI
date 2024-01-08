export default interface UpdateAccountGateway {
    udpate(user:object, id:string): Promise<any>
}