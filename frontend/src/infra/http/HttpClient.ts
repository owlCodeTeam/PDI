export default interface HttpClient{
    get(url: string): Promise<any>
    post(url: string, data: object): Promise<any>
    patch(url: string, data: object): Promise<any>
    //delete(url: string): Promise<any>
}