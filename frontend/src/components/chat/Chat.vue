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
          v-model="data.message"
          placeholder="Mensagem"
        />
        <q-btn 
          icon="send"
          class="col-2 full-height"
          flat
          @click="sendMessage"
        />
      </div>
  </div>
</template>

<script lang="ts">
import SocketIoAction from 'src/core/socketIo/SocketIoAction';
import { defineComponent, inject, reactive, ref } from 'vue'
export default defineComponent({
  name: 'ChatVue',
  setup() {
    const socketIoAction = inject('socketIoAction') as SocketIoAction
    const data = reactive({
      receiver: "32a13c58-58f3-474b-b3f8-13972640278d",
      sender: "32a13c58-58f3-474b-b3f8-13972640278d",
      message: ""
    })

    async function sendMessage() {
      const response = await socketIoAction.executeSend(data)
      console.log(response)
      console.log(await socketIoAction.executeReceive('send-message'))
    }

    return {
      data,
      sendMessage
    }
  }
})
</script>
