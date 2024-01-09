import { io } from "socket.io-client";
import SocketIoAction from "src/core/socketIo/SocketIoAction";
import SocketIoGatewayHttp from "src/infra/socketIo/SocketIOGatewayHttp";
import { expect, test } from "vitest";

const socketBaseUrl = 'http://localhost:4000'
const socketIo = io(socketBaseUrl)

const socketIoGateway = new SocketIoGatewayHttp(socketIo)
const socketIoAction = new SocketIoAction(socketIoGateway)

test('Deve enviar uma mensagem ao backend, por socket', async () => {
    await socketIoAction.executeSend('receive-message', 'socket ok')
})
test('Deve receber uma mensagem do backend', async () => {
    const response = socketIo.on('connect', () => {
        return 'conectado'
    })
    expect(response).toBe('conectado')
})
