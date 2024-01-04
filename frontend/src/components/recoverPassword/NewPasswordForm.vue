<template>
  <div class="row">
    <div class="col-12 row justify-center items-center">
      <p class="text-h6 col-8 text-center">
        Por favor, insira sua nova senha nos campos abaixo para concluir a alteração da senha.
      </p>
    </div>
    <div class="col-12 row justify-center items-center">
      <q-input 
        outlined 
        v-model="newPassword.password" 
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
        v-model="newPassword.confirmPassword" 
        class="text-h6 col-sm-7 col-11 q-my-sm" 
        label="Confirmar senha"
        color="indigo-10" 
        :type="showPassword ? 'password' : 'text'"
      >
        <template v-slot:prepend>
          <q-icon name="key" />
        </template>
      </q-input>
      <q-btn
        label="Confirmar"
        class="bg-indigo-10 text-white col-7 text-subtitle1"
        @click="onSubmit"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
export default defineComponent({
  name: 'NewPasswordForm',
  setup(_, {emit}) {
    const newPassword = reactive({
      password: '',
      confirmPassword: ''
    })
    const showPassword = ref(true)
  
    function onSubmit() {
      emit('setNewPassword', newPassword)
    }

    return {
      newPassword,
      showPassword,
      onSubmit
    }
  }
})
</script>
