
import VerifyAccountAction from "src/core/verifyAccount/VerifyAccountAction"
import VerifyAccountGatewayHttp from "src/infra/verifyAccount/VerifyAccountGatewayHttp"
import { expect, test } from "vitest"
import AxiosAdpter from "src/infra/http/AxiosAdapter"
import VerifyAccountTokenEntity from "src/core/verifyAccount/VerifyAccountTokenEntity"

const axiosAdapter = new AxiosAdpter()
const baseUrl = 'http://localhost:3000/'

const verifyAccountGateway = new VerifyAccountGatewayHttp(axiosAdapter, baseUrl)
const verifyAccountAction = new VerifyAccountAction(verifyAccountGateway)

test('Deve fazer o pedido de um novo token', async() => {
    try {
        const email = 'henriquedevprofessional@gmail.com'
        const response = await verifyAccountAction.newRequest(email)
        expect(response.status).toBe(true)
    } catch (error:any) {
        console.log(error.message)
    }
})

test('Deve fazer o pedido de um novo token com email vazio', async() => {
    try {
        const email = ''
        const response = await verifyAccountAction.newRequest(email)
        expect(response.status).toBe(true)
    } catch (error:any) {
        expect(error.message).toBe('Cannot GET /send/token/')
    }
})

test('Deve fazer o pedido de um novo token com email inválido', async() => {
    try {
        const email = 'henriquedevprofessional@'
        const response = await verifyAccountAction.newRequest(email)
        expect(response.status).toBe(true)
    } catch (error:any) {
        expect(error.message).toBe('Esse usuario não existe no banco de dados')
    }
})

test("Deve validar um usuário sem token inserido", async () => {
    try {
        const tokenObject = {
            token: '' as string
        }
        const tokenEntityResponse = new VerifyAccountTokenEntity(tokenObject)
        const response = await verifyAccountAction.execute(String(tokenEntityResponse))
    } catch (error:any) {
        expect(error.message).toBe('Token inválido')
    }
})

test("Deve validar um usuário com token inválido", async () => {
    try {
        const tokenObject = {
            token: 'dsas5rd34' as string
        }
        const tokenEntityResponse = new VerifyAccountTokenEntity(tokenObject)
        const response = await verifyAccountAction.execute(String(tokenEntityResponse))
    } catch (error:any) {
        expect(error.message).toBe('JsonWebTokenError: jwt malformed')
    }
})

test("Deve validar um usuário com token válido", async () => {
    try {
        const response = await verifyAccountAction.execute('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMWJkZmRlZWQtYTc5Mi00MDM0LWJiMjgtODRiYTc5NDI4MjE0IiwibmFtZSI6ImhlbnJpcXVlIiwiZW1haWwiOiJoZW5yaXF1ZWRldnByb2Zlc3Npb25hbEBnbWFpbC5jb20iLCJpYXQiOjE3MDQ0NzkyODJ9.evTXeGf13KebHCMCji43qfIaoDoH8XPHyHTRlk89l7Y')
        expect(response.message).toBe('Conta verificada com sucesso')
    } catch (error:any) {
        expect(error.message).toBe('JsonWebTokenError: jwt malformed')
    }
})