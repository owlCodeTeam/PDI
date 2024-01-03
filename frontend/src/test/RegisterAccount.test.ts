import LoginGatewayHttp from "src/infra/gateway/LoginGatewayHttp"
import MockAdpter from "src/infra/http/MockAdapter"
import { expect, test } from "vitest"

const mockAdpter = new MockAdpter()
const baseUrl = 'http://localhost:3000/'
const loginGateway = new LoginGatewayHttp(mockAdpter, baseUrl)

test("Deve tentar cadastrar uma conta", async () => {
    const user = {
        name: 'henrique',
        email: 'henrique@gmail.com',
        password: '12345678'
    }
    const response = await loginGateway.login(user)
    console.log(response)
    expect(response).toBe(true)
})