import { boot } from 'quasar/wrappers'
import AxiosAdpter from 'src/infra/http/AxiosAdpter'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({app}) => {
  const httpClient = new AxiosAdpter()
  const baseUrl = 'http://localhost:3000/'
})
