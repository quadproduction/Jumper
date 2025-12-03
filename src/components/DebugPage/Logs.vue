<template>
  <div
    ref="logsContainer"
    class="grow overflow-auto bg-slate-200 shadow-inner dark:bg-slate-800"
  >
    <div
      v-for="(log, i) in showedLogs"
      :key="log.timestamp"
      class="whitespace-pre-wrap px-2 font-mono"
      :class="{
        'text-slate-800 dark:text-slate-300':
          log.level !== 'error' && log.level !== 'warn',
        'bg-slate-300/50 bg-opacity-60 dark:bg-slate-700 dark:bg-opacity-30':
          i % 2 === 0 && log.level !== 'error' && log.level !== 'warn',
        'bg-red-100 font-semibold text-red-500 dark:bg-slate-800':
          log.level === 'error',
        'bg-orange-100 font-semibold text-orange-500 dark:bg-slate-800':
          log.level === 'warn'
      }"
    >
      {{ log.level.toLocaleUpperCase() }} - {{ log.timestamp }} [{{
        log.namespace
      }}
      - {{ log.execId.slice(0, 6) }}]: {{ log.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Log } from '@/stores/logsStore'

defineProps<{
  showedLogs: Log[]
}>()
</script>
