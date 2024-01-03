<template>
  <q-page 
    class="row"  
  >
    <div class="col-12 col-sm-9 flex justify-center items-center">
      <div class="row justify-center">
        <div class="col-11 text-center q-my-md">
          <p class="text-h4">Verifique a sua conta</p>
          <p class="text-subtitle1">Certifique-se de verificar o token recebido no seu e-mail para concluir com segurança o processo.</p>
        </div>
        <div class="col-12 q-my-xl row justify-around items-center">
          <q-input
            class="col-sm-10 col-8"
            outlined
            color="indigo-10"
            label="Token"
            v-model="user.token"
          >
            <template v-slot:prepend>
              <q-icon name="key" />
            </template>
          </q-input>
          <q-btn 
            icon="send" 
            class="col-sm-1 col-2 bg-indigo-10 text-white full-height"
            @click="onSubmit"
          />
        </div>
        <div class="col-12 q-my-md row justify-center items-center">
          <div class="col-11 text-center text-subtitle1">
            Caso o token não tenha chegado, por favor, verifique sua caixa de spam ou considere solicitar o reenvio.
          </div>
          <div class="col-12 row justify-center q-my-sm">
            <q-btn 
              label="Reenviar"
              class="col-auto text-h6"
              color="indigo-10"
              @click="newVerificationRequest()"
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
import { defineComponent, inject, onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import VerifyAccountAction from '../core/verifyAccount/VerifyAccountAction'
import VerifyAccountTokenEntity from 'src/core/verifyAccount/VerifyAccountTokenEntity'
import { Notify } from 'quasar'

export default defineComponent({
  name: 'VerifyAccountPage',
  setup() {
    const verifyAccountAction = inject('verifyAccountAction') as VerifyAccountAction
    const route = useRoute()
    const router = useRouter()
    const user = reactive({
      email: route.params.email,
      token: '' as string
    })
    const token = new VerifyAccountTokenEntity(user)

    function newVerificationRequest() {
      console.log(user)
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
      if (token.validateSession(route.params.email) == false) {
        Notify.create({
          message: 'Você não tem permissão para acessar esta página',
          color: 'red-14',
          position: 'top'
        })
        localStorage.removeItem('user-email')
        router.push('/')
      }
    })

    return {
      user,
      newVerificationRequest,
      onSubmit
    }
  }
})
</script>
