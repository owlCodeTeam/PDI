<template>
  <div class="row full-width">
    <div class="col-12 text-center q-my-md row justify-center">
      <p class="text-h4 text-bold col-11">PDI</p>
      <p class="text-h6 col-10">
        acesse seu email e clique no  
        <span class="text-indigo-10">
          botão
        </span>
        de recuperação de senha para restaurar o acesso à sua conta com segurança.
      </p>
    </div>
    <div class="col-12 row justify-center q-my-xl">
      <div class="col-12 flex justify-center items-center">
        <p class="text-subtitle1 q-ma-none">
          Não chegou nenhum email? 
          <span class="text-indigo-10">
            Reenvie novamente!
          </span>
        </p>
      </div>
      <div class="col-12 row justify-center items-center">
        <q-btn 
          label="Reenviar"
          class="bg-indigo-10 text-subtitle2 text-white col-3"
          @click="newEmailRequest"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Notify } from 'quasar'
import RecoverPasswordAction from 'src/core/recoverPassword/RecoverPasswordAction'
import RecoverPasswordDataEntity from 'src/core/recoverPassword/RecoverPasswordDataEntity'
import { defineComponent, inject, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
export default defineComponent({
  name: 'SendTokenForm',
  props: {
    emailProps: String
  },
  setup(props, { emit }) {
    const email = ref(props.emailProps)
    const route = useRoute()
    const token = ref(route.params.token)
    const recoverPasswordAction = inject('recoverPasswordAction') as RecoverPasswordAction

    const onSubmit = async() => {
      if (route.params.token) {
        emit('setToken', token.value)
        emit('sendNextPageStep', 'new-password')
      }
    }

    async function newEmailRequest() {
      try {
        const responseDataEntity = new RecoverPasswordDataEntity()
        responseDataEntity.validateEmail(String(email.value))
        const responseAction = await recoverPasswordAction.executeGetToken(String(email.value))
        if (responseAction.statusEmail == true) {
          Notify.create({
            message: `Novo email contendo o token de recuperação foi enviado com sucesso para: ${email.value}`,
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

    onMounted(() => {
      onSubmit()
    })

    return {
      token,
      newEmailRequest,
      onSubmit
    }
  }
})
</script>
