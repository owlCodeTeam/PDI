<template>
  <div class="row full-width">
    <div class="col-12 text-center q-my-md row justify-center">
      <p class="text-h4 text-bold col-11">PDI</p>
      <p class="text-h6 col-11">
        Envie o
        <span class="text-indigo-10">
          token
        </span>
        que foi fornecido no email
      </p>
    </div>
    <div class="col-12 row justify-center">
      <q-input 
        class="col-5"
        outlined
        label="Token"
        v-model="token"
        color="indigo-10"
      />
      <q-btn
        class="bg-indigo-10 full-height text-white q-mx-md" 
        icon="send"
        @click="onSubmit"
      />
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
import RecoverPasswordDataEntity from 'src/core/recoverPassword/RecoverPasswordDataEntity'
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'SendTokenForm',
  props: {
    emailProps: String
  },
  setup(props, { emit }) {
    const token = ref('')
    const email = ref(props.emailProps)

    const onSubmit = () => {
      try {
        const response = new RecoverPasswordDataEntity()
        response.validateToken(token.value)
        emit('setToken', token.value)
        emit('sendNextPageStep', 'new-password')
      } catch (error) {
        Notify.create({
          message: error.message,
          color: 'red-14',
          position: 'top'
        })
      }
    }

    function newEmailRequest() {
      console.log('Nova requesição de email em => '+email.value)
    }

    return {
      token,
      newEmailRequest,
      onSubmit
    }
  }
})
</script>
