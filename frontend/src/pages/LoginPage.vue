<template>
  <q-page 
    padding 
    class="row justify-center items-center"
  >
    <div class="col-12 col-sm-6 flex justify-center items-center">
      <q-img 
        src="../assets/login-illustration.svg"
        width="80%"
        class="q-my-sm"
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
      <LoginForm />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, inject, reactive, ref } from 'vue'
import LoginForm from '../components/login/LoginForm.vue'

export default defineComponent({
  name: 'LoginPage',
  components: {
    LoginForm
  }
})
</script>
