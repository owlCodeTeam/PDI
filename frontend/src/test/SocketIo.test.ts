import { io } from "socket.io-client"
import SocketIoAction from "src/core/socketIo/SocketIoAction"
import AxiosAdpter from "src/infra/http/AxiosAdapter"
import SocketIoGatewayHttp from "src/infra/socketIo/SocketIOGatewayHttp"
import { expect, test } from "vitest"

const axiosAdapter = new AxiosAdpter()
const baseUrl = 'http://localhost:3000/'
const socketBaseUrl = 'http://localhost:4000'

const socketIo = io(socketBaseUrl, {
    transports: ['websocket'],
    withCredentials: true,
});

const socketIoGateway = new SocketIoGatewayHttp(socketIo, axiosAdapter, baseUrl)
const socketIoAction = new SocketIoAction(socketIoGateway)

test('Deve enviar uma mensagem ao socket', async() => {
    try {
        const data = {
            receiver: "32a13c58-58f3-474b-b3f8-13972640278d",
            sender: "32a13c58-58f3-474b-b3f8-13972640278d",
            message: "mensagem de exemplo: olá"
        }
        const response = await socketIoAction.executeSend(data)
        console.log(response)
        expect(response).toBe(true)
    } catch (error) {
        console.log(error)
    }
})