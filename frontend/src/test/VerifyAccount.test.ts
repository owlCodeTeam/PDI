
import VerifyAccountAction from "src/core/VerifyAccount/VerifyAccountAction"
import VerifyAccountGatewayHttp from "src/infra/VerifyAccount/VerifyAccountGatewayHttp"
import MockAdapter from "src/infra/http/MockAdapter"
import { expect, test } from "vitest"

const mockAdpter = new MockAdapter()
const baseUrl = 'http://localhost:3000/'

const verifyAccountGateway = new VerifyAccountGatewayHttp(mockAdpter, baseUrl)
const verifyAccountAction = new VerifyAccountAction(verifyAccountGateway)

test("Deve validar um usuário", async () => {
    const response = await verifyAccountAction.execute('fasdgadasdwaws')
    expect(response.status).toBe(true)
})