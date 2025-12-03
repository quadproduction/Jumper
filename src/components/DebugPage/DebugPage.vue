<template>
  <div class="flex h-full">
    <SideBar v-model:selection="selection" :showOptionsExec="showOptionsExec" />
    <div class="flex w-full flex-col">
      <Logs :showedLogs="showedLogs" />
      <BottomBar
        :showedLogs="showedLogs"
        v-model:showOptionsExec="showOptionsExec"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CodeExec } from '@/composables/useCodeExec/useCodeExec'

import { computed, ref, watch } from 'vue'

import { useExecutionsStore } from '@/stores'
import { useLogsStore } from '@/stores/logsStore'

import BottomBar from './BottomBar.vue'
import Logs from './Logs.vue'
import SideBar from './SideBar.vue'

const executionsStore = useExecutionsStore()
const logsStore = useLogsStore()

const showOptionsExec = ref(false)
const selection = ref<CodeExec['id'][]>([])

const showedLogs = computed(() => {
  const logs = logsStore.logs.filter(log => {
    if (showOptionsExec.value) return true
    const exec = executionsStore.executions.find(
      execution => execution.id === log.execId
    )
    if (exec && exec.mode !== 'get-options') return true
  })
  if (!selection.value.length) return logs
  return logs.filter(log => selection.value.includes(log.execId))
})

watch(
  () => executionsStore.executions,
  (executions: CodeExec[]) => {
    selection.value = selection.value.filter(id =>
      executions.some(execution => execution.id === id)
    )
  }
)
</script>
