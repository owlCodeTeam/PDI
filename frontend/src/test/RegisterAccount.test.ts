import RegisterAccountAction from "src/core/registerAccount/RegisterAccountAction"
import RegisterAccountDataEntity from "src/core/registerAccount/RegisterAccountDataEntity"
import RegisterAccountGatewayHttp from "src/infra/registerAccount/RegisterAccountGatewayHttp"
import MockAdapter from "src/infra/http/MockAdapter"
import { expect, test } from "vitest"
import AxiosAdpter from "src/infra/http/AxiosAdapter"
import FetchAdapter from "src/infra/http/FetchAdapter"

const mockAdpter = new MockAdapter()
const fetchAdapter = new FetchAdapter()
const AxiosAdapter = new AxiosAdpter()
const baseUrl = 'http://localhost:3000/'

const registerAccountGateway = new RegisterAccountGatewayHttp(AxiosAdapter, baseUrl)
const registerAccountAction = new RegisterAccountAction(registerAccountGateway)

test("Deve criar um usuário válido", async () => {
    const registerData = {
        username: "userTeste",
        password: "12345678",
        email: "usuario01@email.com",
        cpf: "111.111.111-11"
    }
    const confirmPassword = '12345678'
    const user = new RegisterAccountDataEntity(registerData, confirmPassword)
    const response = await registerAccountAction.execute(user)
    expect(response.status).toBe(true)
})

test("Deve criar um usuário com nome inválido", async () => {
    const registerData = {
        username: '$%432',
        email: 'henrique@gmail.com',
        password: '12345678',
        cpf: '111.111.111-43'
    }
    const confirmPassword = '12345678'
    try {
        const user = new RegisterAccountDataEntity(registerData, confirmPassword)
        const response = await registerAccountAction.execute(user)
        expect(response.status).toBe(true)
    } catch (error) {
        expect(error?.message).toBe('O nome de usuário não pode conter números ou caracteres especiais')
    }
})

test("Deve criar um usuário com email inválido (sem caracter após @)", async () => {
    const registerData = {
        username: 'Henrique Gabriel Moraes Denoni',
        email: 'henrique@',
        password: '12345678',
        cpf: '111.111.111-43'
    }
    const confirmPassword = '12345678'
    try {
        const user = new RegisterAccountDataEntity(registerData, confirmPassword)
        const response = await registerAccountAction.execute(user)
        expect(response.status).toBe(true)
    } catch (error) {
        expect(error?.message).toBe('Email inválido')
    }
})

test("Deve criar um usuário com email inválido (sem @)", async () => {
    const registerData = {
        username: 'Henrique Gabriel Moraes Denoni',
        email: 'henriquegabriel.com',
        password: '12345678',
        cpf: '111.111.111-43'
    }
    const confirmPassword = '12345678'
    try {
        const user = new RegisterAccountDataEntity(registerData, confirmPassword)
        const response = await registerAccountAction.execute(user)
        expect(response.status).toBe(true)
    } catch (error) {
        expect(error?.message).toBe('Email inválido')
    }
})

test("Deve criar um usuário com email inválido (sem caracter antes do @)", async () => {
    const registerData = {
        username: 'Henrique Gabriel Moraes Denoni',
        email: '@.com',
        password: '12345678',
        cpf: '111.111.111-43'
    }
    const confirmPassword = '12345678'
    try {
        const user = new RegisterAccountDataEntity(registerData, confirmPassword)
        const response = await registerAccountAction.execute(user)
        expect(response.status).toBe(true)
    } catch (error) {
        expect(error?.message).toBe('Email inválido')
    }
})

test("Deve criar um usuário com a senha muito pequena", async () => {
    const registerData = {
        username: 'Henrique Gabriel Moraes Denoni',
        email: 'henrique@.com',
        password: '12345',
        cpf: '111.111.111-43'
    }
    const confirmPassword = '12345678'
    try {
        const user = new RegisterAccountDataEntity(registerData, confirmPassword)
        const response = await registerAccountAction.execute(user)
        expect(response.status).toBe(true)
    } catch (error) {        
        expect(error?.message).toBe('A senha deve conter no minímo 8 caracteres')
    }
})

test("Deve criar um usuário com o CPF vazio", async () => {
    const registerData = {
        username: 'Henrique Gabriel Moraes Denoni',
        email: 'henrique@.com',
        password: '12345678',
        cpf: ''
    }
    const confirmPassword = '12345678'
    try {
        const user = new RegisterAccountDataEntity(registerData, confirmPassword)
        const response = await registerAccountAction.execute(user)
        expect(response.status).toBe(true)
    } catch (error) {
        expect(error?.message).toBe('O campo CPF não pode estar vazio')
    }
})

test("Deve criar um usuário com o CPF de tamanho inválido", async () => {
    const registerData = {
        username: 'Henrique Gabriel Moraes Denoni',
        email: 'henrique@.com',
        password: '12345678',
        cpf: '321.312'
    }
    const confirmPassword = '12345678'
    try {
        const user = new RegisterAccountDataEntity(registerData, confirmPassword)
        const response = await registerAccountAction.execute(user)
        expect(response.status).toBe(true)
    } catch (error) {
        expect(error?.message).toBe('CPF inválido')
    }
})