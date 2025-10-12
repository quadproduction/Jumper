<template>
  <BackOfficePageLayout>
    <div class="mb-4 flex w-full flex-col gap-1 border-b px-1 pb-4">
      <div class="flex items-center space-x-2">
        <h2 class="text-xl font-semibold text-slate-800 dark:text-slate-200">
          Info page
        </h2>
      </div>
      <p class="text-sm text-slate-400 dark:text-slate-500">
        Get information about Jumper application.
      </p>
    </div>
    <div
      class="flex max-w-[200px] flex-col gap-1 rounded-md border bg-slate-50 p-3 py-2 h-[100px]"
    >
      <h2 class="text-md font-semibold text-slate-800 dark:text-slate-200 mb-1">
        Versions
      </h2>
      <div
        class="flex items-center gap-1 text-sm font-semibold text-slate-600 dark:text-slate-400"
      >
        <img
          class="inline h-4"
          src="@/assets/jumper-logo.png"
          alt="Jumper logo"
        />
        Jumper: {{ jumperVersion }}
      </div>
      <div
        class="flex items-center gap-1 text-sm font-semibold text-slate-600 dark:text-slate-400"
      >
        <Carrot class="inline h-5 w-[21px] text-orange-500" />
        Carrot: {{ carrotVersion }}
      </div>
    </div>
  </BackOfficePageLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Carrot } from 'lucide-vue-next';
import BackOfficePageLayout from '../@common/BackOfficePageLayout.vue'
import { getVersion } from '@tauri-apps/api/app'
import jumper from '@/services/jumper';

const jumperVersion = ref<string | null>(null)
const carrotVersion = ref<string | null>(null)

getVersion().then((version) => {
  jumperVersion.value = version
})


jumper.client.getInfo().then((info) => {
  carrotVersion.value = info.version
})
</script>
