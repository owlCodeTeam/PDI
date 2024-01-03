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