import LoginAction from "src/core/login/LoginAction"
import LoginDataEntity from "src/core/login/LoginDataEntity"
import LoginGatewayHttp from "src/infra/login/LoginGatewayHttp"
import { expect, test } from "vitest"
import AxiosAdpter from "src/infra/http/AxiosAdapter"

const axiosAdapter = new AxiosAdpter()
const baseUrl = 'http://localhost:3000/'

const loginGateway = new LoginGatewayHttp(axiosAdapter, baseUrl)
const loginAction = new LoginAction(loginGateway)

test("Deve tentar realizar login com uma conta válida", async () => {
    const loginData = {
        username: 'henriquedevprofessional@gmail.com',
        password: '12345678'
    }
    try {
        const user = new LoginDataEntity(loginData)
        const response = await loginAction.execute(user)
        expect(response.status).toBe(true)
    } catch (error) {
        throw new Error(error.message)
    }
})

test("Deve tentar realizar login com uma conta inválida", async () => {
    const loginData = {
        username: 'dasdsadasdsa@gmail.com',
        password: '12345678'
    }
    try {
        const user = new LoginDataEntity(loginData)
        const response = await loginAction.execute(user)
        expect(response.status).toBe(true)
    } catch (error) {
        expect(error.message).toBe('Usuario não encontrado')
    }
})

test("Deve tentar realizar login com email inválido", async () => {
    const loginData = {
        username: '@gmail.com',
        password: '12345678'
    }
    try {
        const user = new LoginDataEntity(loginData)
        const response = await loginAction.execute(user)
        expect(response.status).toBe(true)
    } catch (error) {
        expect(error.message).toBe('Username inválido')
    }
})

test("Deve tentar realizar login com a senha inválida", async () => {
    const loginData = {
        username: 'henriquedevprofessional@gmail.com',
        password: '124'
    }
    try {
        const user = new LoginDataEntity(loginData)
        const response = await loginAction.execute(user)
        expect(response.status).toBe(true)
    } catch (error) {
        expect(error.message).toBe('Senha inválida')
    }
})

test("Deve tentar realizar login com o email vazio", async () => {
    const loginData = {
        username: '',
        password: '12345678'
    }
    try {
        const user = new LoginDataEntity(loginData)
        const response = await loginAction.execute(user)
        expect(response.status).toBe(true)
    } catch (error) {
        expect(error.message).toBe('O campo username não pode estar vazio')
    }
})

test("Deve tentar realizar login com a senha vazia", async () => {
    const loginData = {
        username: 'henriquedevprofessional@gmail.com',
        password: ''
    }
    try {
        const user = new LoginDataEntity(loginData)
        const response = await loginAction.execute(user)
        expect(response.status).toBe(true)
    } catch (error) {
        expect(error.message).toBe('O campo senha não pode estar vazio')
    }
})
