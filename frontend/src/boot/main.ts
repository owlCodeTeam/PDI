import { boot } from 'quasar/wrappers'
import LoginGatewayHttp from 'src/infra/Login/LoginGatewayHttp'
import AxiosAdapter from '../infra/http/AxiosAdapter'
import MockAdapter from '../infra/http/MockAdapter'
import LoginAction from 'src/core/Login/LoginAction'
import RegisterAccountGatewayHttp from 'src/infra/RegisterAccount/RegisterAccountGatewayHttp'
import RegisterAccountAction from 'src/core/RegisterAccount/RegisterAccountAction'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({app}) => {

  const httpClient = new AxiosAdapter()
  const mockAdpter = new MockAdapter()
  const baseUrl = 'http://localhost:3000/'

  const loginGateway = new LoginGatewayHttp(mockAdpter, baseUrl)
  const loginAction =  new LoginAction(loginGateway)
  app.provide('loginAction', loginAction)

  const registerAccountGateway = new RegisterAccountGatewayHttp(mockAdpter, baseUrl)
  const registerAccountAction = new RegisterAccountAction(registerAccountGateway)
  app.provide('registerAccountAction', registerAccountAction)
})
