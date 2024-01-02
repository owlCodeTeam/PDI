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
        <div class="col-12 q-my-xl row justify-center items-center">
          <q-input
            class="col-10"
            outlined
            color="indigo-10"
            label="Token"
            v-model="user.token"
          >
            <template v-slot:prepend>
              <q-icon name="key" />
            </template>
          </q-input>
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
import { defineComponent, reactive } from 'vue'
import { useRoute } from 'vue-router'
export default defineComponent({
  name: 'VerifyAccountPage',
  setup() {
    const router = useRoute()
    const user = reactive({
      email: router.params.email,
      token: '' as string
    })

    function newVerificationRequest() {
      console.log('new request')
      console.log(user)
    }

    return {
      user,
      newVerificationRequest
    }
  }
})
</script>
