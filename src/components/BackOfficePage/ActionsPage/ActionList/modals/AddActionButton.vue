<template>
  <FormModal
    title="New action"
    :form="actionForm"
    description="Create a new action."
    :onSubmit="onSubmit"
    v-model:open="open"
  >
    <template #trigger>
      <Button class="w-full" size="sm"><Carrot />New Action</Button>
    </template>
    <template #default>
      <div class="flex flex-col">
        <SelectField
          class="w-[150px]"
          size="sm"
          fieldName="data.type"
          field-label="Type"
          :items="[...ACTION_TYPES]"
        />
        <InputField field-name="name" label="Name" />
        <TextareaField field-name="description" label="Description" />
      </div>
    </template>
  </FormModal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { ACTION_TYPES } from '@@types'
import type { ActionsComposable } from '../../useActions'
import { useActionForm } from './useActionForm'
import { useToast } from '@@materials/ui/toast'
import { Carrot } from 'lucide-vue-next'
import { Button } from '@@materials/ui/button'
import { FormModal } from '@@materials/modal'
import { InputField, TextareaField } from '@@materials/input'
import { SelectField } from '@@materials/form'

const { toast } = useToast()
const actionForm = useActionForm()
const open = ref(false)

const props = defineProps<{
  actionsComposable: ActionsComposable
}>()

const onSubmit = actionForm.handleSubmit(async (values) => {
  try {
    await props.actionsComposable.create(values)
  } catch (error) {
    if (error instanceof Error) {
      toast({
        title: 'Failed to create action.',
        description: error.message,
        variant: 'destructive'
      })
    }
  }
  toast({
    title: `"${values.name}" action created.`
  })
  return true
})

watch(open, (newVal) => {
  if (newVal === true) {
    actionForm.setValues({
      name: '',
      description: '',
      data: {
        type: ACTION_TYPES[0]
      }
    })
  }
})
</script>
