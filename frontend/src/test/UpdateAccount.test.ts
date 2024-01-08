import UpdateAccountAction from "src/core/updateAccount/UpdateAccountAction";
import UpdateAccountDataEntity from "src/core/updateAccount/UpdateAccountDataEntity";
import AxiosAdpter from "src/infra/http/AxiosAdapter";
import UpdateAccountGatewayHttp from "src/infra/updateAccount/UpdateAccountGatewayHttp";
import { expect, test } from "vitest";

const AxiosAdapter = new AxiosAdpter()
const baseUrl = 'http://localhost:3000/'

const updateAccountGateway = new UpdateAccountGatewayHttp(AxiosAdapter, baseUrl)
const updateAccountAction = new UpdateAccountAction(updateAccountGateway)

test("Deve atualizar os dados de uma conta", async() => {
    const id = '1bdfdeed-a792-4034-bb28-84ba79428214'
    const updateAccountData = {
        username: "Henrique Fake",
        email: "henriquedevprofessional@gmail.com",
    }
    try {
        const user = new UpdateAccountDataEntity(updateAccountData)
        const response = await updateAccountAction.execute(user, id)
        expect(response.status).toBe(true)
    } catch (error) {
        throw new Error(error.message)
    }

})