<template>
  <q-page 
    padding 
    class="row justify-center items-center"
  >
    <div class="col-12 col-sm-6 flex justify-center items-center">
      <q-img 
        src="../assets/login-illustration.svg"
        width="80%"
      />
    </div>
    <div class="col-12 col-sm-6 row justify-center items-center">
      <div class="row q-my-sm justify-center">
        <p class="q-ma-none text-h3 text-bold col-11 text-center q-my-md">
          PDI
        </p>
        <p class="q-ma-none text-h6 col-10 text-center">
          Plano de Desenvolvimento Individual
        </p>
      </div>
      <div class="q-my-xl">
        <q-form 
          class="row justify-center justify-center items-center"
          @submit="onSubmit"
        >
          <q-input 
            outlined 
            v-model="loginData.email"
            class="text-h6 col-sm-7 col-11 q-my-sm"
            label="Email"
            color="indigo-10"
            type="text"
            :rules="[inputIsNull()]"
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
            color="indigo-10"
            :type="showPassword.data ? 'password' : 'text'"
            :rules="[inputIsNull()]"
          >
            <template v-slot:prepend>
              <q-icon name="key" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="showPassword.data ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="showPassword.data = !showPassword.data"
              />
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
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'LoginPage',
  setup() {
    const loginData = reactive({
      email: '' as string,
      password: '' as string
    })
    const showPassword = reactive({data: true})
    const router = useRouter()
    
    const inputIsNull = () => (val: any) => (!!val || 'Este campo é obrigatório')

    function onSubmit() {
      console.log(loginData)
      router.push('/control-panel')
    }

    return {
      loginData,
      showPassword,
      router,
      inputIsNull,
      onSubmit
    }
  }
})
</script>
