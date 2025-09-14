<template>
  <FormField v-slot="{ componentField }" :name="fieldName">
    <FormItem class="space-y-0 flex w-full flex-col">
      <FormLabel v-if="fieldLabel" class="ml-1 dark:text-slate-200 mb-1">{{
        fieldLabel
      }}</FormLabel>
      <FormControl>
        <Select
          v-bind="{
            ...componentField,
            ...$slots,
            ...{
              items,
              itemKey,
              label,
              placeholder,
              search,
              clear,
              loading,
              description,
              class: props.class,
              variant,
              size,
              commandListClass,
              disabled
            }
          }"
        >
        </Select>
      </FormControl>
      <FormDescription v-if="description" class="ml-1 dark:text-slate-500">{{
        description
      }}</FormDescription>
      <div v-if="showErrorMessage" class="h-6 pl-1">
        <FormMessage />
      </div>
    </FormItem>
  </FormField>
</template>

<script setup lang="ts" generic="T, U">
import type { HTMLAttributes } from 'vue'
import { Select, type SelectVariants } from './Select'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@@materials/ui/form'

const props = withDefaults(
  defineProps<{
    fieldLabel: string
    fieldName: string
    items: T[]
    itemKey?: keyof T | ((item: T) => U)
    label?: keyof T | ((item: T) => string)
    placeholder?: string
    search?: boolean
    clear?: boolean
    loading?: boolean
    showErrorMessage?: boolean
    description?: string
    class?: HTMLAttributes['class']
    variant?: SelectVariants['variant']
    size?: SelectVariants['size']
    commandListClass?: HTMLAttributes['class']
    disabled?: boolean
  }>(),
  {
    showErrorMessage: true,
    getValue: (item: T) => item
  }
)
</script>
