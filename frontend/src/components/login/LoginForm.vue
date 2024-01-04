<template>
  <div class="q-my-xl">
    <q-form 
      class="row justify-center justify-center items-center" 
      @submit="onSubmit"
    >
      <q-input 
        outlined 
        v-model="loginData.username" 
        class="text-h6 col-sm-7 col-11 q-my-sm" 
        label="Username" 
        hint="Email"
        color="indigo-10"
        type="text"
      >
        <template v-slot:prepend>
          <q-icon name="person" />
        </template>
      </q-input>
      <q-input 
        outlined 
        v-model="loginData.password" 
        class="text-h6 col-sm-7 col-11 q-my-sm" 
        label="Senha"
        color="indigo-10" :type="showPassword ? 'password' : 'text'"
      >
        <template v-slot:prepend>
          <q-icon name="key" />
        </template>
        <template v-slot:append>
          <q-icon :name="showPassword ? 'visibility_off' : 'visibility'" class="cursor-pointer"
            @click="showPassword = !showPassword" />
        </template>
      </q-input>
      <div class="col-sm-7 col-11 text-right">
        <p 
          class="q-ma-none text-subtitle1 text-indigo-10 cursor-pointer" 
          @click="router.push('/recover-password')"
        >
          Esqueceu a senha?
        </p>
      </div>
      <q-btn 
        label="Entrar" 
        color="indigo-10" 
        class="col-sm-7 col-11 q-my-md text-h6" 
        type="submit" 
      />
      <div class="col-sm-7 col-11 text-center">
        <p class="q-ma-none text-subtitle1">
          Não tem uma uma conta?
          <span 
            class="text-indigo-10 cursor-pointer" 
            @click="router.push('/register-account')"
          >
            Registre-se
          </span>
        </p>
      </div>
    </q-form>
  </div>
</template>

<script lang="ts">
import { Notify } from 'quasar'
import LoginAction from 'src/core/login/LoginAction'
import LoginDataEntity from 'src/core/login/LoginDataEntity'
import { defineComponent, inject, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'LoginForm',
  setup() {
    const loginAction = inject('loginAction') as LoginAction
    const loginData = reactive({
      username: '' as string,
      password: '' as string
    })
    const showPassword = ref(true)
    const router = useRouter()
    
    
    async function onSubmit() {
      try {
        const user = new LoginDataEntity({
          username: loginData.username, 
          password: loginData.password
        })
        const response = await loginAction.execute(user)
        console.log(response)
        if (response?.status == true) {
          router.push('/control-panel')
        }
      } catch (error:any) {
        console.log(error)
        Notify.create({
          message: error.message,
          color: 'red-14',
          position: 'top'
        })
      }
    }

    return {
      loginData,
      showPassword,
      router,
      onSubmit
    }
  }
})
</script>
