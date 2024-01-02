<template>
  <q-page 
    padding
    class="row justify-center items-center"
  >
  <div class="">
    teste
  </div>  
  </q-page>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
export default defineComponent({
  name: 'RegisterAccount',
  setup() {
    const registerData = reactive({
      name: '' as string,
      email: '' as string,
      password: '' as string
    })
    const confirmPassword = reactive({data: '' as string})
  }
})
</script>
