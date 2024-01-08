import axios from "axios";
import HttpClient from "./HttpClient";

export default class AxiosAdpter implements HttpClient {
    async get(url: string): Promise<any> {
        try {
            const response = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return response
        } catch (error) {
            return error.response
        }
    }

    async post(url:string, data:object): Promise<any> {
        try {
            const response = await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return response
        } catch (error) {
            return error.response
        }
    }
 
    async patch(url:string, data:object): Promise<any> {
        try {
            const response = await axios.patch(url, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return response
        } catch (error) {
            return error.response
        }
    }
}