import { boot } from 'quasar/wrappers'
import LoginGatewayHttp from 'src/infra/gateway/LoginGatewayHttp'
import AxiosAdapter from '../infra/http/AxiosAdapter'
import MockAdapter from '../infra/http/MockAdapter'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({app}) => {

  const httpClient = new AxiosAdapter()
  const mockAdpter = new MockAdapter()
  const baseUrl = 'http://localhost:3000/'

  const loginGateway = new LoginGatewayHttp(mockAdpter, baseUrl)
  app.provide('loginGateway', loginGateway)
})
