import HttpClient from "./HttpClient";

export default class MockAdpter implements HttpClient{
    async post(url: string, data: object): Promise<any> {
        const response = await 'Post Mock Success'
        return response
    }
    async get(url: string): Promise<any> {
        const response = await 'Get Mock Success'
        return response
    }
}