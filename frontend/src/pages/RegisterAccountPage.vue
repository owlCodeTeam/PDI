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
      <RegisterAccountForm />
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
import { defineComponent } from 'vue'
import RegisterAccountForm from 'src/components/registerAccount/RegisterAccountForm.vue'
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'RegisterAccount',
  setup() {
    const router = useRouter()

    return {
      router
    }
  },
  components: {
    RegisterAccountForm
  },
})
</script>
