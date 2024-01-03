<template>
  <q-page class="row justify-center">
    <q-page-sticky 
      position="top-left" 
      :offset="[18, 18]"
    >
      <q-btn 
        icon="keyboard_arrow_left" 
        class="text-bold fit bg-indigo-10 text-white" 
        @click="router.push('/')"
      />
    </q-page-sticky>
    <div class="col-12 col-sm-9 flex justify-center items-center">
      <SendEmailForm v-if="pageStep == 'email'" :sendEmail="getEmail" />
      <SendTokenForm v-if="pageStep == 'token'" />
    </div>  
    <div class="col-12 col-sm-3 bg-indigo-8 flex justify-center items-center">
      <q-img 
        class="q-ma-xl"
        src="../assets/recover-password-illustration.svg"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, inject, reactive, ref } from 'vue'
import { useRouter } from 'vue-router';
import SendEmailForm from '../components/recoverPassword/SendEmailForm.vue'
import SendTokenForm from '../components/recoverPassword/SendTokenForm.vue'

export default defineComponent({
  name: 'RecoverPasswordPage',
  setup() {
    const router = useRouter()
    const pageStep = ref('email')

    const user = reactive({
      email: '' as string
    })

    const getEmail = (data:string) => {
      user.email = data
      console.log(user)
    }

    return {
      router,
      pageStep,
      getEmail
    }
  },
  components: {
    SendEmailForm,
    SendTokenForm
  }
})
</script>
