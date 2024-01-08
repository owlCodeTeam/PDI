import RecoverPasswordAction from "src/core/recoverPassword/RecoverPasswordAction";
import RecoverPasswordDataEntity from "src/core/recoverPassword/RecoverPasswordDataEntity";
import AxiosAdpter from "src/infra/http/AxiosAdapter";
import RecoverPasswordGatewayHttp from "src/infra/recoverPassword/RecoverPasswordGatewayHttp";
import { expect, test } from "vitest";

const axiosAdapter = new AxiosAdpter()
const baseUrl = 'http://localhost:3000/'

const recoverPasswordGateway = new RecoverPasswordGatewayHttp(axiosAdapter, baseUrl)
const recoverPasswordAction = new RecoverPasswordAction(recoverPasswordGateway)

test('Deve fazer o pedido de um novo email para recuperacao', async() => {
    const userData = {
        email: 'henriquedevprofessional@gmail.com',
        token: 'DdSFSDAwsddas',
        password: '12345678',
        confirmPassword: '12345678'
    }
    try {
        const email = new RecoverPasswordDataEntity(userData)
        const response = await recoverPasswordAction.executeGetToken(email.props.email)
        expect(response.statusEmail).toBe(true)
    } catch (error) {
        console.log(error)
    }
})

test('Deve fazer o pedido de um novo email para recuperacao, com o email vazio', async() => {
    const userData = {
        email: '',
        token: 'DdSFSDAwsddas',
        password: '12345678',
        confirmPassword: '12345678'
    }
    try {
        const email = new RecoverPasswordDataEntity(userData)
        const response = await recoverPasswordAction.executeGetToken(email.props.email)
        expect(response.statusEmail).toBe(true)
    } catch (error:any) {
        expect(error.message).toBe("O email não pode estar vazio")
    }
})

test('Deve fazer a alteração de senha', async() => {
    const userData = {
        email: 'henriquedevprofessional@gmail.com',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMWJkZmRlZWQtYTc5Mi00MDM0LWJiMjgtODRiYTc5NDI4MjE0IiwibmFtZSI6ImhlbnJpcXVlIiwiZW1haWwiOiJoZW5yaXF1ZWRldnByb2Zlc3Npb25hbEBnbWFpbC5jb20iLCJpYXQiOjE3MDQ0NzkyODJ9.evTXeGf13KebHCMCji43qfIaoDoH8XPHyHTRlk89l7Y',
        password: '12345678',
        confirmPassword: '12345678'
    }
    try {
        const user = new RecoverPasswordDataEntity(userData)
        const newPassword = {
            token: user.props?.token,
            newPassword: user.props?.password
        }
        const response = await recoverPasswordAction.executeRecoverPassword(newPassword)
        expect(response.passwordChangeStatus).toBe(true)
    } catch (error:any) {
        console.log(error.message)
    }
})