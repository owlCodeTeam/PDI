<template>
  <q-page class="row justify-center">
    <q-page-sticky 
      v-if="pageStep != 'new-password'"
      position="top-left" 
      :offset="[18, 18]"
    >
      <q-btn 
        icon="keyboard_arrow_left" 
        class="text-bold fit bg-indigo-10 text-white" 
        @click="leaveThePage"
      />
    </q-page-sticky>
    <div class="col-12 col-sm-9 flex justify-center items-center fit-height">
      <SendEmailForm 
        v-if="pageStep == 'email'"
        @setEmail="getEmail"
        @sendNextPageStep="changePageStep"
      />
      <SendTokenForm 
        v-if="pageStep == 'token'" 
        :email-props="user.email"
        @setToken="getToken"
        @sendNextPageStep="changePageStep"
      />
      <NewPasswordForm 
        v-if="pageStep == 'new-password'"
        @setNewPassword="getNewPassword"
      />
    </div>  
    <div class="col-12 col-sm-3 bg-indigo-8 flex justify-center items-center">
      <q-img 
        class="q-ma-md"
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
import NewPasswordForm from 'src/components/recoverPassword/NewPasswordForm.vue';
import { SessionStorage } from 'quasar';

export default defineComponent({
  name: 'RecoverPasswordPage',
  setup() {
    const router = useRouter()
    const pageStep = ref(SessionStorage.getItem('page-step') ? SessionStorage.getItem('page-step') : 'email')

    const user = reactive({
      email: '' as string,
      token: '' as string,
    })
    var newPassword:object = reactive({
      password: '' as string,
      confirmPassword: '' as string
    })

    function onSubmit() {
      console.log(user)
      console.log(newPassword)
    }

    function getEmail(email:string) {
      user.email = email
    }

    function getToken(token:string) {
      user.token = token
    }

    function getNewPassword(data:object) {
      newPassword = data
      onSubmit()
    }

    function changePageStep(step:string) {
      pageStep.value = step
    }

    function leaveThePage() {
      router.push('/')
    }

    return {
      router,
      pageStep,
      user,
      leaveThePage,
      getEmail,
      getToken,
      changePageStep,
      getNewPassword
    }
  },
  components: {
    SendEmailForm,
    SendTokenForm,
    NewPasswordForm
  }
})
</script>
