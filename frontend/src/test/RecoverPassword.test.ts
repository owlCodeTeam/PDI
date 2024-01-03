import RecoverPasswordAction from "src/core/recoverPassword/RecoverPasswordAction";
import RecoverPasswordDataEntity from "src/core/recoverPassword/RecoverPasswordDataEntity";
import MockAdpter from "src/infra/http/MockAdapter";
import RecoverPasswordGatewayHttp from "src/infra/recoverPassword/RecoverPasswordGatewayHttp";
import { expect, test } from "vitest";

const mockAdpter = new MockAdpter()
const baseUrl = 'http://localhost:3000/'

const recoverPasswordGateway = new RecoverPasswordGatewayHttp(mockAdpter, baseUrl)
const recoverPasswordAction = new RecoverPasswordAction(recoverPasswordGateway)

test('Deve fazer o pedido de um novo email para recuperacao', async() => {
    const userData = {
        email: 'henrique@gmail.com',
        token: 'DdSFSDAwsddas'
    }
    try {
        const user = new RecoverPasswordDataEntity(userData)
        const response = await recoverPasswordAction.executeSendEmail(user.email())
        expect(response).toBe(true)
    } catch (error) {
        expect(error?.message).toBe('Email inválido')
    }
})

test('Deve fazer o pedido de verificação de token', async() => {
    const userData = {
        email: 'henrique@gmail.com',
        token: 'DdSFSDAwsddas'
    }
    try {
        const user = new RecoverPasswordDataEntity(userData)
        const response = await recoverPasswordAction.executeSendToken(user.token())
        expect(response).toBe(true)
    } catch (error) {
        expect(error?.message).toBe('Email inválido')
    }
})

test('Deve fazer o pedido, porém com email invalido', async() => {
    const userData = {
        email: 'henrique@',
        token: 'DdSFSDAwsddas'
    }
    try {
        const user = new RecoverPasswordDataEntity(userData)
        const response = await recoverPasswordAction.executeSendEmail(user.email())
        expect(response).toBe(true)
    } catch (error) {
        expect(error?.message).toBe('Email inválido')
    }
})

test('Deve fazer o pedido, porém com token invalido', async() => {
    const userData = {
        email: 'henrique@',
        token: ''
    }
    try {
        const user = new RecoverPasswordDataEntity(userData)
        const response = await recoverPasswordAction.executeSendToken(user.token())
        expect(response).toBe(true)
    } catch (error) {
        expect(error?.message).toBe('O token não pode estar vazio')
    }
})