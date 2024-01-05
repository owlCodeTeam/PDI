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
        :email-props="userData.email"
        @setToken="getToken"
        @sendNextPageStep="changePageStep"
      />
      <NewPasswordForm 
        v-if="pageStep == 'new-password'"
        @setNewPassword="getNewPassword"
        @loading="getLoadingStatus"
      />
      <q-dialog 
        v-model="awaitPageResponse"
        persistent
      >
        <q-spinner
          color="indigo-10"
          size="4em"
        />
      </q-dialog>
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
import { defineComponent, inject, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import SendEmailForm from '../components/recoverPassword/SendEmailForm.vue'
import SendTokenForm from '../components/recoverPassword/SendTokenForm.vue'
import NewPasswordForm from 'src/components/recoverPassword/NewPasswordForm.vue';
import { Notify, SessionStorage } from 'quasar';
import RecoverPasswordAction from 'src/core/recoverPassword/RecoverPasswordAction';

export default defineComponent({
  name: 'RecoverPasswordPage',
  setup() {
    const recoverPasswordAction = inject('recoverPasswordAction') as RecoverPasswordAction
    const router = useRouter()
    const route = useRoute()
    const pageStep = ref(SessionStorage.getItem('page-step') ? SessionStorage.getItem('page-step') : 'email')
    const awaitPageResponse = ref(false)

    const userData = reactive({
      email: '' as string,
      token: '' as string,
      password: '' as string,
      confirmPassword: '' as string
    })

    async function onSubmit() {
      const user = {
        token: route.params.token,
        newPassword: userData.password
      }
      console.log(user)
      try {
        const response = await recoverPasswordAction.executeRecoverPassword(user)
        if (response.passwordChangeStatus == true) {
          Notify.create({
            message: 'Senha alterada com sucesso!',
            color: 'green-7',
            position: 'top'
          })
          router.push('/')
        }
      } catch (error:any) {
        Notify.create({
          message: error.message,
          color: 'red-14',
          position: 'top'
        })
      }
    }

    function getEmail(email:string) {
      userData.email = email
    }

    function getToken(token:string) {
      userData.token = token
    }

    function getNewPassword(data:any) {
      userData.password = data.password
      userData.confirmPassword = data.confirmPassword
      onSubmit()
    }

    function getLoadingStatus(status:boolean) {
      awaitPageResponse.value = status
    }

    function changePageStep(step:string) {
      pageStep.value = step
    }

    function leaveThePage() {
      router.push('/')
    }

    onMounted(() => {
      if (route.params.token) {
        pageStep.value = 'token'
        userData.token = String(route.params.token)
      }
    })

    return {
      router,
      pageStep,
      userData,
      awaitPageResponse,
      getLoadingStatus,
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
