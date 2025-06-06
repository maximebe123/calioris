import type { FormEvent, ReactNode } from 'react'

interface AuthFormProps {
  title: string
  error?: string
  submitLabel: string
  onSubmit: (e: FormEvent) => void
  children: ReactNode
}

export default function AuthForm({
  title,
  error,
  submitLabel,
  onSubmit,
  children,
}: AuthFormProps) {
  return (
    <form onSubmit={onSubmit} className="auth-form">
      <h2>{title}</h2>
      {error && <div className="error">{error}</div>}
      {children}
      <button type="submit">{submitLabel}</button>
    </form>
  )
}
