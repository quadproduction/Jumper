import { cva, type VariantProps } from 'class-variance-authority'

export { default as Textarea } from './Textarea.vue'

export const textareaVariants = cva(
  'rounded-lg bg-background transition-colors focus-visible:ring-0 focus-visible:ring-offset-0 text-md',
  {
    variants: {
      variant: {
        default: 'border border-border focus:border-primary/20',
        secondary: 'border-none bg-accent',
        error:
          'border-destructive focus-visible:border-destructive bg-destructive/5'
      },
      size: {
        lg: 'min-h-80 max-h-120',
        default: 'min-h-24 max-h-60',
        sm: 'min-h-20 max-h-32 text-sm',
        xs: 'min-h-12 max-h-20 text-sm'
      },
      resize: {
        default: 'resize-y',
        none: 'resize-none',
        horizontal: 'resize-x'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      resize: 'default'
    }
  }
)

export type TextareaVariants = VariantProps<typeof textareaVariants>
