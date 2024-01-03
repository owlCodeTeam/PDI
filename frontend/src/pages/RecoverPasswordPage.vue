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
      left
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
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'RecoverPasswordPage',
  setup() {
    const router = useRouter()

    return {
      router
    }
  }
})
</script>
