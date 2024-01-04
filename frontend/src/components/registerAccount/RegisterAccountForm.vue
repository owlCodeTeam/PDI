<template>
  <div>
    <div class="text-center ">
      <p class="q-my-xl text-h4">
        Crie a sua conta
      </p>
    </div>
    <q-form 
      class="row justify-center items-center" 
      @submit="onSubmit"
    >
      <q-input 
        outlined 
        v-model="registerData.username" 
        class="text-h6 col-sm-7 col-11 q-my-sm" 
        label="Nome"
        color="indigo-10" 
        type="text"
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
        :type="showPassword ? 'password' : 'text'"
      >
        <template v-slot:prepend>
          <q-icon name="key" />
        </template>
        <template v-slot:append>
          <q-icon 
            :name="showPassword ? 'visibility_off' : 'visibility'" 
            class="cursor-pointer"
            @click="showPassword = !showPassword" 
          />
        </template>
      </q-input>
      <q-input 
        outlined 
        v-model="confirmPassword.data" 
        class="text-h6 col-sm-7 col-11 q-my-sm" 
        label="Senha"
        color="indigo-10" 
        :type="showPassword ? 'password' : 'text'"
      >
        <template v-slot:prepend>
          <q-icon name="key" />
        </template>
      </q-input>
      <q-input 
        outlined 
        v-model="registerData.cpf" 
        class="text-h6 col-sm-7 col-11 q-my-sm" 
        label="CPF"
        mask="###.###.###-##"
        color="indigo-10" 
        type="text"
      >
        <template v-slot:prepend>
          <q-icon name="-" />
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
</template>

<script lang="ts">
import { defineComponent, inject, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Notify } from 'quasar'
import RegisterAccountAction from 'src/core/registerAccount/RegisterAccountAction'
import RegisterAccountDataEntity from 'src/core/registerAccount/RegisterAccountDataEntity'

export default defineComponent({
  name: 'RegisterAccountForm',
  setup() {
    const registerAccountAction = inject('registerAccountAction') as RegisterAccountAction
    const showPassword = ref(true)
    const router = useRouter()
    const registerData = reactive({
      username: '' as string,
      email: '' as string,
      password: '' as string,
      cpf: '' as string
    })
    const confirmPassword = reactive({data: '' as string})

    async function onSubmit() {
      try {
        const user = new RegisterAccountDataEntity(registerData, confirmPassword.data)
        const response = await registerAccountAction.execute(user)
        console.log(response)
        if (response?.status == true) {
          router.push(`/verify-account/${user.email()}`)
        }
      } catch (error:any) {
        Notify.create({
          message: error.message,
          color: 'red-14',
          position: 'top'
        })
      }
    }
    
    return {
      registerData,
      confirmPassword,
      showPassword,
      router,
      onSubmit
    }
  }
})
</script>
