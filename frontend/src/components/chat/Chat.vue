<template>
  <div class="col-12 column">
    <q-scroll-area class="col-11">
      <q-chat-message
        :text="['Lorem Ipsu Dorem']"
        sent
        class="q-my-md q-mx-md"
        bg-color="indigo-10"
        text-color="white"
      />
      <q-chat-message
        name="fake username"
        :text="['Lorem Ipsu']"
        bg-color="grey-4"
        class="q-my-md q-mx-md"
      />
    </q-scroll-area>
      <div class="row blue-grey-2 col-1 justiify-center items-center">
        <q-input 
          borderless
          class="col-10 text-h6 q-px-sm"
          v-model="messageInput"
          placeholder="Mensagem"
        />
        <q-btn 
          icon="send"
          class="col-2 full-height"
          flat
        />
      </div>
  </div>
</template>

<script lang="ts">
import SocketIoAction from 'src/core/socketIo/SocketIoAction';
import { defineComponent, inject, ref } from 'vue'
export default defineComponent({
  name: 'ChatVue',
  setup() {
    const socketIoAction = inject('socketIoAction') as SocketIoAction
    const messageInput = ref('')

    return {
      messageInput
    }
  }
})
</script>
