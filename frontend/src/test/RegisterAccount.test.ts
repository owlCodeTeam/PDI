import RegisterAccountAction from "src/core/RegisterAccount/RegisterAccountAction"
import RegisterAccountDataEntity from "src/core/RegisterAccount/RegisterAccountDataEntity"
import RegisterAccountGatewayHttp from "src/infra/RegisterAccount/RegisterAccountGatewayHttp"
import MockAdapter from "src/infra/http/MockAdapter"
import { expect, test } from "vitest"

const mockAdpter = new MockAdapter()
const baseUrl = 'http://localhost:3000/'

const registerAccountGateway = new RegisterAccountGatewayHttp(mockAdpter, baseUrl)
const registerAccountAction = new RegisterAccountAction(registerAccountGateway)

test("Deve criar um usuário válido", async () => {
    const registerData = {
        name: 'Henrique Gabriel Moraes Denoni',
        email: 'henrique@gmail.com',
        password: '12345678'
    }
    const user = new RegisterAccountDataEntity(registerData)
    const response = await registerAccountAction.execute(user)
    expect(response.status).toBe(true)
})