import LoginAction from "src/core/login/LoginAction"
import LoginDataEntity from "src/core/login/LoginDataEntity"
import LoginGatewayHttp from "src/infra/login/LoginGatewayHttp"
import MockAdapter from "src/infra/http/MockAdapter"
import { expect, test } from "vitest"

const mockAdpter = new MockAdapter()
const baseUrl = 'http://localhost:3000/'
const loginGateway = new LoginGatewayHttp(mockAdpter, baseUrl)
const loginAction = new LoginAction(loginGateway)

test("Deve tentar realizar login válido", async () => {
    const loginData = {
        email: 'henrique@gmail.com',
        password: '12345678'
    }
    const user = new LoginDataEntity(loginData)
    const response = await loginAction.execute(user)
    expect(response.status).toBe(true)
})

test("Deve tentar realizar com email inválido", async () => {
    const loginData = {
        email: 'henrique@',
        password: '12345678'
    }
    try {
        const user = new LoginDataEntity(loginData)
        const response = await loginAction.execute(user)
        expect(response.status).toBe(true)
    } catch(error) {
        expect(error?.message).toBe('Email inválido')
    }
})

test("Deve tentar realizar com senha inválida", async () => {
    const loginData = {
        email: 'henrique@gmail.com',
        password: ''
    }
    try {
        const user = new LoginDataEntity(loginData)
        const response = await loginAction.execute(user)
        expect(response.status).toBe(true)
    } catch(error) {
        expect(error?.message).toBe('O campo senha não pode estar vazio')
    }
})