import type { UserPreferences } from '@@types'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

export const useUserPreferencesForm = (
  userPreferences?: UserPreferences
): ReturnType<typeof useForm> => {
  const userPreferencesSchema = toTypedSchema(
    z.object({
      disableDefaultBackgroundImage: z.boolean(),
    })
  )
  return useForm({
    validationSchema: userPreferencesSchema,
    initialValues: userPreferences
  })
}
