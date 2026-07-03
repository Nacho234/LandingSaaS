import { forwardRef, type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

const baseField =
  'w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 transition-colors focus:border-accent-400/60 focus:bg-white/[0.06] outline-none'

interface WrapProps {
  label: string
  error?: string
  required?: boolean
  hint?: string
  children: React.ReactNode
  htmlFor?: string
}

function FieldWrap({ label, error, required, hint, children, htmlFor }: WrapProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-slate-200">
        {label}
        {required && <span className="ml-1 text-accent-400" aria-hidden>*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-slate-500">{hint}</p>}
      {error && (
        <p role="alert" className="text-xs text-rose-400">
          {error}
        </p>
      )}
    </div>
  )
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  hint?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, required, id, className, ...props }, ref) => {
    const fieldId = id ?? `f-${label.replace(/\s+/g, '-').toLowerCase()}`
    return (
      <FieldWrap label={label} error={error} required={required} hint={hint} htmlFor={fieldId}>
        <input
          ref={ref}
          id={fieldId}
          aria-invalid={!!error}
          className={cn(baseField, error && 'border-rose-400/50', className)}
          {...props}
        />
      </FieldWrap>
    )
  },
)

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  error?: string
  options: { value: string; label: string }[]
  placeholder?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, required, id, className, ...props }, ref) => {
    const fieldId = id ?? `s-${label.replace(/\s+/g, '-').toLowerCase()}`
    return (
      <FieldWrap label={label} error={error} required={required} htmlFor={fieldId}>
        <select
          ref={ref}
          id={fieldId}
          aria-invalid={!!error}
          className={cn(baseField, 'appearance-none cursor-pointer', error && 'border-rose-400/50', className)}
          defaultValue=""
          {...props}
        >
          {placeholder && (
            <option value="" disabled className="bg-ink-900">
              {placeholder}
            </option>
          )}
          {options.map((o) => (
            <option key={o.value} value={o.value} className="bg-ink-900">
              {o.label}
            </option>
          ))}
        </select>
      </FieldWrap>
    )
  },
)

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
  hint?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, required, id, className, ...props }, ref) => {
    const fieldId = id ?? `t-${label.replace(/\s+/g, '-').toLowerCase()}`
    return (
      <FieldWrap label={label} error={error} required={required} hint={hint} htmlFor={fieldId}>
        <textarea
          ref={ref}
          id={fieldId}
          rows={3}
          aria-invalid={!!error}
          className={cn(baseField, 'resize-none', error && 'border-rose-400/50', className)}
          {...props}
        />
      </FieldWrap>
    )
  },
)
