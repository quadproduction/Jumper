import { cva, type VariantProps } from 'class-variance-authority'

export { default as Input } from './Input.vue'
export { default as BeforeInput } from './BeforeInput.vue'
export { default as AfterInput } from './AfterInput.vue'
export { default as AutoComplete } from './AutoComplete.vue'

export const inputVariants = cva(
  'rounded-lg bg-background transition-colors ps-3',
  {
    variants: {
      variant: {
        default: 'border border-border focus:border-primary',
        secondary: 'border-none bg-accent',
        error:
          'border-destructive focus-visible:border-destructive bg-destructive/5'
      },
      size: {
        lg: 'h-11 text-lg',
        default: 'h-10',
        sm: 'h-9 text-sm',
        xs: 'h-7 text-sm'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export type InputVariants = VariantProps<typeof inputVariants>
