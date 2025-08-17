<script setup lang="ts">
import TitleBar from './components/TitleBar/TitleBar.vue'
import DebugTitleBar from './components/TitleBar/DebugTitleBar.vue'
import Toaster from '@@materials/ui/toast/Toaster.vue'
import { RouterView, useRoute } from 'vue-router'
import { useColorMode } from '@vueuse/core'
import { getCurrentWindow } from '@tauri-apps/api/window'
import { useUpdater } from './composables/useUpdater'

useColorMode({ disableTransition: false })
const route = useRoute()

const updater = useUpdater()
const window = getCurrentWindow()
if (window.label === 'main') {
  updater.checkUpdatePeriodicallyOnFocus()
}
</script>

<template>
  <div class="h-screen overflow-hidden">
    <TitleBar
      v-if="route.name && route.name !== 'debug' && route.name !== 'updater'"
    />
    <DebugTitleBar v-if="route.name && route.name === 'debug'" />
    <main
      id="main"
      :class="{
        'h-full': route.name === 'updater',
        'mt-[32px] h-[calc(100%-32px)]': route.name !== 'updater'
      }"
    >
      <RouterView />
    </main>
  </div>
  <Toaster />
</template>
