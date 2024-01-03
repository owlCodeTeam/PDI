import LoginGatewayHttp from "src/infra/gateway/LoginGatewayHttp"
import MockAdapter from "src/infra/http/MockAdapter"
import { expect, test } from "vitest"

const mockAdpter = new MockAdapter()
const baseUrl = 'http://localhost:3000/'
const loginGateway = new LoginGatewayHttp(mockAdpter, baseUrl)

test("Deve tentar realizar login", async () => {
    const user = {
        email: 'henrique@gmail.com',
        password: '12345678'
    }
    const response = await loginGateway.login(user)
    expect(response.status).toBe(true)
})