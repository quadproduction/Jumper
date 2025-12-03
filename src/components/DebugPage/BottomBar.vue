<template>
  <div
    class="flex h-[22px] w-full items-center bg-slate-300 px-2 dark:bg-slate-900 shrink-0"
  >
    <div class="flex items-center gap-1">
      <MiniSwitch
        class="data-[state=checked]:bg-blue-300"
        v-model="showOptionsExec"
      />
      <p class="text-xs italic text-slate-400">Get Options</p>
    </div>
    <Button
      class="ml-auto flex h-[18px] w-[18px] items-center justify-center p-2.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
      variant="ghost"
      title="Clear logs"
      :disabled="showedLogs.length === 0"
      @click="executionsStore.clear()"
    >
      <Ban />
    </Button>
  </div>
</template>

<script setup lang="ts">
import { Ban } from 'lucide-vue-next'

import { useExecutionsStore } from '@/stores'
import { type Log } from '@/stores/logsStore'

import { Button } from '@@materials/ui/button'
import { MiniSwitch } from '@@materials/ui/switch'

const executionsStore = useExecutionsStore()

defineProps<{
  showedLogs: Log[]
}>()

const showOptionsExec = defineModel<boolean>('showOptionsExec', {
  default: false
})
</script>
