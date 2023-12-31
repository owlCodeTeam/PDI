<template>
  <q-page 
    class="row"  
  >
    <div class="col-12 col-sm-9 flex justify-center items-center">
      <div class="row justify-center">
        <div class="col-11 text-center q-my-md">
          <p class="text-h4">Verifique seu email</p>
          <p class="text-subtitle1">
            Por favor, verifique seu e-mail e clique no botão de verificação para concluir o processo. Obrigado!
          </p>
        </div>
        <div class="col-12 q-my-md row justify-center items-center">
          <div class="col-11 text-center text-subtitle1">
            Caso não tenha recebido o email, solicite o reenvio.
          </div>
          <div class="col-12 row justify-center q-my-sm">
            <q-btn 
              label="Reenviar"
              class="col-auto text-h6"
              color="indigo-10"
              @click="newVerificationRequest"
              :disable="newRequestButtonStatus"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 col-sm-3 bg-indigo-10 flex justify-center items-center">
      <q-img 
        class="q-ma-md"
        src="../assets/verify-account-illustration.svg"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import VerifyAccountAction from 'src/core/verifyAccount/VerifyAccountAction'
import VerifyAccountTokenEntity from 'src/core/verifyAccount/VerifyAccountTokenEntity'
import { Notify } from 'quasar'

export default defineComponent({
  name: 'VerifyAccountPage',
  setup() {
    const verifyAccountAction = inject('verifyAccountAction') as VerifyAccountAction
    const route = useRoute()
    const router = useRouter()
    const user = reactive({
      email: route.params.email as string,
      token: '' as string
    })
    const token = new VerifyAccountTokenEntity(user)
    const newRequestButtonStatus = ref(false)

    async function newVerificationRequest() {
      try {
        const response = await verifyAccountAction.newRequest(user.email)
        if (response.status == true) {
          Notify.create({
            message: 'O novo pedido de verificação de e-mail foi feito com sucesso! cheque a sua caixa de entrada',
            color: 'green-7',
            position: 'top'
          })
        }
      } catch (error:any) {
        Notify.create({
          message: error.message,
          color: 'red-14',
          position: 'top'
        })
      }
    }

    async function onSubmit() {
      try {
        token.validateToken() 
        const response = await verifyAccountAction.execute(token.data())
        if (response.status == true) {
          Notify.create({
            message: response?.message,
            color: response?.color,
            position: 'top'
          })
          localStorage.removeItem('user-email')
          router.push(`${response?.route}`)
        }
      } catch (error:any) {
        Notify.create({
          message: error.message,
          color: 'red-14',
          position: 'top'
        })
      }
    }

    onMounted(async() => {
      if(route.params?.token) {
        user.token = route.params.token
        onSubmit()
      }
      sleepNewRequest()
    })

    function sleep(ms:number) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }

    async function sleepNewRequest() {
      newRequestButtonStatus.value = true
      await sleep(10)
      newRequestButtonStatus.value = false
    }

    return {
      user,
      newRequestButtonStatus,
      newVerificationRequest,
      sleepNewRequest
    }
  }
})
</script>
