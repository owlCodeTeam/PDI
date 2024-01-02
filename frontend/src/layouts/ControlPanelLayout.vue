<template>
  <q-layout view="hHh lpR fFf">

    <q-header 
      bordered c
      class="bg-indigo-10 text-white text-right"
    >
      <q-btn 
        dense 
        flat 
        round 
        size="130%"
        icon="menu" 
        @click="toggleRightDrawer" 
      />
    </q-header>

    <q-drawer 
      show-if-above 
      v-model="rightDrawerOpen" 
      side="right" 
      bordered
      class="bg-grey-5"
    >
      <q-btn 
        flat
        label="Sair"
        class="text-red-14 text-h6 full-width"
      />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const rightDrawerOpen = ref(false)

    return {
      rightDrawerOpen,
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      }
    }
  }
}
</script>