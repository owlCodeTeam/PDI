<template>
  <q-page 
    class="row justify-center"
  >
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
      <div>
        <div class="text-center ">
          <p class="q-my-xl text-h4">
            Crie a sua conta
          </p>
        </div>
        <q-form class="row justify-center items-center">
          <q-input 
            outlined 
            v-model="registerData.name"
            class="text-h6 col-sm-7 col-11 q-my-sm"
            label="Nome"
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
            v-model="registerData.email"
            class="text-h6 col-sm-7 col-11 q-my-sm"
            label="Email"
            color="indigo-10"
            type="text"
            :rules="[inputIsNull()]"
          >
            <template v-slot:prepend>
              <q-icon name="mail" />
            </template>
          </q-input>
          <q-input 
            outlined 
            v-model="registerData.password"
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
          <q-input 
            outlined 
            v-model="confirmPassword.data"
            class="text-h6 col-sm-7 col-11 q-my-sm"
            label="Senha"
            color="indigo-10"
            :type="showPassword.data ? 'password' : 'text'"
            :rules="[inputIsNull(), passwordAreTheSame()]"
          >
            <template v-slot:prepend>
              <q-icon name="key" />
            </template>
          </q-input>
          <q-btn 
            label="Criar"
            color="indigo-10"
            class="col-sm-7 col-11 q-my-md text-h6"
            type="submit"
          />
        </q-form>
      </div>
    </div>  
    <div class="col-12 col-sm-3 bg-indigo-8 flex justify-center items-center">
      <q-img 
        class="q-my-md"
        src="../assets/register-account-illustration.svg"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'RegisterAccount',
  setup() {
    const showPassword = reactive({data: true})
    const router = useRouter()
    const registerData = reactive({
      name: '' as string,
      email: '' as string,
      password: '' as string
    })
    const confirmPassword = reactive({data: '' as string})

    const inputIsNull = () => (val: any) => (!!val || 'Este campo é obrigatório')
    const passwordAreTheSame = () => (val: any) => (val == registerData.password || 'As senhas devem ser iguais')

    return {
      registerData,
      confirmPassword,
      showPassword,
      router,
      passwordAreTheSame,
      inputIsNull
    }
  }
})
</script>
