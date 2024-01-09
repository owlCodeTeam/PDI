import { boot } from 'quasar/wrappers'
import LoginGatewayHttp from 'src/infra/login/LoginGatewayHttp'
import AxiosAdapter from '../infra/http/AxiosAdapter'
import LoginAction from 'src/core/login/LoginAction'
import RegisterAccountGatewayHttp from 'src/infra/registerAccount/RegisterAccountGatewayHttp'
import RegisterAccountAction from 'src/core/registerAccount/RegisterAccountAction'
import VerifyAccountGatewayHttp from 'src/infra/verifyAccount/VerifyAccountGatewayHttp'
import VerifyAccountAction from 'src/core/verifyAccount/VerifyAccountAction'
import RecoverPasswordGatewayHttp from 'src/infra/recoverPassword/RecoverPasswordGatewayHttp'
import RecoverPasswordAction from 'src/core/recoverPassword/RecoverPasswordAction'
import { io } from 'socket.io-client'
import SocketIoGatewayHttp from 'src/infra/socketIo/SocketIOGatewayHttp'
import SocketIoAction from 'src/core/socketIo/SocketIoAction'


// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({app}) => {

  const axiosAdapter = new AxiosAdapter()
  const baseUrl = 'http://localhost:3000/'
  const socketBaseUrl = 'http://localhost:4000'
  
  //const socketIo = io(socketBaseUrl, {
  //  transports: ['websocket'],
  //  withCredentials: true,
  //});
  //socketIo.on('connect', () => {
  //  console.log('conectado')
  //})

  //const socketIoGateway = new SocketIoGatewayHttp(socketIo)
  //const socketIoAction = new SocketIoAction(socketIoGateway)
  //app.provide('socketIoAction', socketIoAction)

  const loginGateway = new LoginGatewayHttp(axiosAdapter, baseUrl)
  const loginAction =  new LoginAction(loginGateway)
  app.provide('loginAction', loginAction)

  const registerAccountGateway = new RegisterAccountGatewayHttp(axiosAdapter, baseUrl)
  const registerAccountAction = new RegisterAccountAction(registerAccountGateway)
  app.provide('registerAccountAction', registerAccountAction)

  const verifyAccountGateway = new VerifyAccountGatewayHttp(axiosAdapter, baseUrl)
  const verifyAccountAction = new VerifyAccountAction(verifyAccountGateway)
  app.provide('verifyAccountAction', verifyAccountAction)

  const recoverPasswordGateway = new RecoverPasswordGatewayHttp(axiosAdapter, baseUrl)
  const recoverPasswordAction = new RecoverPasswordAction(recoverPasswordGateway)
  app.provide('recoverPasswordAction', recoverPasswordAction)
})
