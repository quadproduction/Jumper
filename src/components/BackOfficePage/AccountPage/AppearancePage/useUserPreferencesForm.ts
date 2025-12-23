import type { UserPreferences } from '@@types'

import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'

export const useUserPreferencesForm = (
  userPreferences?: UserPreferences
): ReturnType<typeof useForm> => {
  const userPreferencesSchema = toTypedSchema(
    z.object({
      allowShowingDescription: z.boolean(),
      disableDefaultBackgroundImage: z.boolean()
    })
  )
  return useForm({
    validationSchema: userPreferencesSchema,
    initialValues: userPreferences
  })
}
