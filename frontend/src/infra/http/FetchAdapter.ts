import HttpClient from "./HttpClient";

export default class FetchAdapter implements HttpClient {
    async post(url: string, data: object): Promise<any> {
        const response = await fetch(url, {
            body: JSON.stringify(data),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return response.json()
    }

    async get(url: string): Promise<any> {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return response.json()
    }
}
