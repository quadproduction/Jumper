<template>
  <Textarea
    :class="cn(textareaVariants({ variant, size, resize }), props.class)"
  />
</template>

<script setup lang="ts">
import { Textarea } from '@@materials/ui/textarea'
import { cn } from '@/services/utils'
import { type TextareaVariants, textareaVariants } from '.'
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  variant?: TextareaVariants['variant']
  size?: TextareaVariants['size']
  resize?: TextareaVariants['resize']
  class?: HTMLAttributes['class']
}>()
</script>
