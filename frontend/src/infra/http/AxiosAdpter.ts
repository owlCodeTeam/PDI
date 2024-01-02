import axios from "axios";
import HttpClient from "./HttpClient";

export default class AxiosAdpter implements HttpClient {
    async get(url: string): Promise<any> {
        const response = await axios.post(url, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response
    }

    async post(url: string, data: object): Promise<any> {
        const response = await axios.post(url, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response
    }
}