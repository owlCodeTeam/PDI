<template>
  <div class="row full-width">
    <div class="col-12 text-center q-my-md row justify-center">
      <p class="text-h4 text-bold col-11">PDI</p>
      <p class="text-h6 col-11">
        Envie o endereço de 
        <span class="text-indigo-10">
          email
        </span>
        relacionado a sua conta e siga para a próxima etapa.
      </p>
    </div>
    <div class="col-12 row justify-center">
      <q-input 
        class="col-5"
        outlined
        label="Email"
        v-model="email"
        color="indigo-10"
      />
      <q-btn
        class="bg-indigo-10 full-height text-white q-mx-md" 
        icon="send"
        @click="onSubmit"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Notify } from 'quasar'
import RecoverPasswordDataEntity from 'src/core/recoverPassword/RecoverPasswordDataEntity'
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'SendEmailForm',
  setup(_, { emit }) {
    const email = ref('')

    const onSubmit = () => {
      try {
        const response = new RecoverPasswordDataEntity()
        response.validateEmail(email.value)
        emit('setEmail', email.value)
        emit('sendNextPageStep', 'token')
      } catch (error:any) {
        Notify.create({
          message: error.message,
          color: 'red-14',
          position: 'top'
        })
      }
    }
    return {
      email,
      onSubmit
    }
  }
})
</script>
