<template>
  <q-layout view="hHh lpR fFf">

    <q-header 
      bordered
      class="bg-indigo-10 text-white text-right"
    >
      <q-btn 
        dense 
        flat 
        round 
        size="130%"
        icon="chat" 
        @click="toggleRightChat" 
      />
      <q-btn 
        dense 
        flat 
        round 
        size="140%"
        icon="menu" 
        @click="toggleRightDrawer" 
      />
    </q-header>
    <q-drawer 
      show-if-above 
      v-model="rightDrawerOpen" 
      side="right" 
      bordered
      class="bg-grey-4"
    >
      <q-btn 
        flat
        label="Sair"
        class="text-red-14 text-h6 full-width"
        @click="logOutOfAccountDialog = true"
      />
      <q-dialog v-model="logOutOfAccountDialog"> 
        <div class="row">
          <div class="col-12 text-h5 text-center">
            <p class="q-ma-none text-bold bg-white q-pa-md">
              Dejesa sair da sua conta?
            </p>
          </div>
          <div class=" col-12 flex justify-center items-center">
            <q-btn 
              class="bg-green-7 text-white q-ma-sm text-h6"
              label="Cancelar"
              @click="logOutOfAccountDialog = false"
            />
            <q-btn 
              class="bg-red-14 text-white q-ma-sm text-h6"
              label="Confirmar"
              @click="logOutOfAccount"
            />
          </div>
        </div>
      </q-dialog>
    </q-drawer>

    <q-drawer 
      show-if-above 
      v-model="rightChatOpen" 
      side="right" 
      bordered
      class="blue-grey-2 column"
      width="450"
    >
      <ChatVue />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ChatVue from 'src/components/chat/Chat.vue'

export default {
  setup () {
    const logOutOfAccountDialog = ref(false)
    const rightDrawerOpen = ref(false)
    const rightChatOpen = ref (false)
    const router = useRouter()

    function logOutOfAccount() {
      router.push('/')
    }

    function toggleRightChat() {
      rightChatOpen.value = !rightChatOpen.value
      rightDrawerOpen.value = false
    }

    function toggleRightDrawer () {
      rightDrawerOpen.value = !rightDrawerOpen.value
      rightChatOpen.value = false
    }

    return {
      rightDrawerOpen,
      logOutOfAccountDialog,
      rightChatOpen,
      toggleRightDrawer,
      logOutOfAccount,
      toggleRightChat
    }
  },
  components: {
    ChatVue
  }
}
</script>