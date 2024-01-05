import RegisterAccountAction from "src/core/registerAccount/RegisterAccountAction"
import RegisterAccountDataEntity from "src/core/registerAccount/RegisterAccountDataEntity"
import RegisterAccountGatewayHttp from "src/infra/registerAccount/RegisterAccountGatewayHttp"
import { expect, test } from "vitest"
import AxiosAdpter from "src/infra/http/AxiosAdapter"

const AxiosAdapter = new AxiosAdpter()
const baseUrl = 'http://localhost:3000/'

const registerAccountGateway = new RegisterAccountGatewayHttp(AxiosAdapter, baseUrl)
const registerAccountAction = new RegisterAccountAction(registerAccountGateway)

test("Deve criar um usuário válido", async () => {
    const registerData = {
        username: "userTeste",
        password: "12345678",
        email: "usuario01@email.com",
        cpf: "850.202.310-10"
    }
    const confirmPassword = '12345678'
    try {
        const user = new RegisterAccountDataEntity(registerData, confirmPassword)
        const response = await registerAccountAction.execute(user)
        expect(response.status).toBe(true)
    } catch (error) {
        throw new Error(error.message)
    }
})

test("Deve criar um usuário com nome inválido", async () => {
    const registerData = {
        username: "423423",
        password: "12345678",
        email: "usuario01@email.com",
        cpf: "850.202.310-10"
    }
    const confirmPassword = '12345678'
    try {
        const user = new RegisterAccountDataEntity(registerData, confirmPassword)
        const response = await registerAccountAction.execute(user)
        expect(response.status).toBe(true)
    } catch (error) {
        expect(error.message).toBe('O nome de usuário não pode conter números ou caracteres especiais')
    }
})

test("Deve criar um usuário com nome vazio", async () => {
    const registerData = {
        username: "",
        password: "12345678",
        email: "usuario01@email.com",
        cpf: "850.202.310-10"
    }
    const confirmPassword = '12345678'
    try {
        const user = new RegisterAccountDataEntity(registerData, confirmPassword)
        const response = await registerAccountAction.execute(user)
        expect(response.status).toBe(true)
    } catch (error) {
        expect(error.message).toBe('O nome de usuário não pode estar vazio')
    }
})

test("Deve criar um usuário com a senha menor que 8 caracteres", async () => {
    const registerData = {
        username: "userTest",
        password: "123",
        email: "usuario01@email.com",
        cpf: "850.202.310-10"
    }
    const confirmPassword = '12345678'
    try {
        const user = new RegisterAccountDataEntity(registerData, confirmPassword)
        const response = await registerAccountAction.execute(user)
        expect(response.status).toBe(true)
    } catch (error) {
        expect(error.message).toBe('A senha deve conter no minímo 8 caracteres')
    }
})

test("Deve criar um usuário com a senha vazia", async () => {
    const registerData = {
        username: "userTest",
        password: "123",
        email: "usuario01@email.com",
        cpf: "850.202.310-10"
    }
    const confirmPassword = '12345678'
    try {
        const user = new RegisterAccountDataEntity(registerData, confirmPassword)
        const response = await registerAccountAction.execute(user)
        expect(response.status).toBe(true)
    } catch (error) {
        expect(error.message).toBe('A senha deve conter no minímo 8 caracteres')
    }
})

test("Deve criar um usuário com email inválido (sem caracter antes do @)", async () => {
    const registerData = {
        username: "userTest",
        password: "12345678",
        email: "@email.com",
        cpf: "850.202.310-10"
    }
    const confirmPassword = '12345678'
    try {
        const user = new RegisterAccountDataEntity(registerData, confirmPassword)
        const response = await registerAccountAction.execute(user)
        expect(response.status).toBe(true)
    } catch (error) {
        expect(error.message).toBe('Email inválido')
    }
})

test("Deve criar um usuário com email inválido (sem caracter depois do @)", async () => {
    const registerData = {
        username: "userTest",
        password: "12345678",
        email: "usuario01@",
        cpf: "850.202.310-10"
    }
    const confirmPassword = '12345678'
    try {
        const user = new RegisterAccountDataEntity(registerData, confirmPassword)
        const response = await registerAccountAction.execute(user)
        expect(response.status).toBe(true)
    } catch (error) {
        expect(error.message).toBe('Email inválido')
    }
})

test("Deve criar um usuário com email vazio", async () => {
    const registerData = {
        username: "userTest",
        password: "12345678",
        email: "",
        cpf: "850.202.310-10"
    }
    const confirmPassword = '12345678'
    try {
        const user = new RegisterAccountDataEntity(registerData, confirmPassword)
        const response = await registerAccountAction.execute(user)
        expect(response.status).toBe(true)
    } catch (error) {
        expect(error.message).toBe('O email não pode estar vazio')
    }
})

test("Deve criar um usuário com cpf inválido", async () => {
    const registerData = {
        username: "userTest",
        password: "12345678",
        email: "usuario01@email.com",
        cpf: "111.111.111-11"
    }
    const confirmPassword = '12345678'
    try {
        const user = new RegisterAccountDataEntity(registerData, confirmPassword)
        const response = await registerAccountAction.execute(user)
        expect(response.status).toBe(true)
    } catch (error) {
        expect(error.message).toBe('O cpf enviado não é um cpf válido')
    }
})

test("Deve criar um usuário com cpf vazio", async () => {
    const registerData = {
        username: "userTest",
        password: "12345678",
        email: "usuario01@email.com",
        cpf: ""
    }
    const confirmPassword = '12345678'
    try {
        const user = new RegisterAccountDataEntity(registerData, confirmPassword)
        const response = await registerAccountAction.execute(user)
        expect(response.status).toBe(true)
    } catch (error) {
        expect(error.message).toBe('O campo CPF não pode estar vazio')
    }
})