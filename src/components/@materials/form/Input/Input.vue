<template>
  <Input :class="cn(inputVariants({ variant, size }), props.class)" />
</template>

<script setup lang="ts">
import { type HTMLAttributes } from 'vue'
import { type InputVariants, inputVariants } from '.'

import { cn } from '@/services/utils'
import { Input } from '@@materials/ui/input'

const props = defineProps<{
  variant?: InputVariants['variant']
  size?: InputVariants['size']
  class?: HTMLAttributes['class']
}>()
</script>
