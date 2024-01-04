import HttpClient from "./HttpClient";

export default class FetchAdapter implements HttpClient {
    async post(url: string, data: object): Promise<any> {
        const responseData = await fetch(url, {
            body: JSON.stringify(data),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        console.log('login')
        const response = await responseData.json()
        console.log(url)
        console.log(response)
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
