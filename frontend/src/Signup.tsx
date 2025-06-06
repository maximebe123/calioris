import { useState } from 'react'
import AuthForm from './components/AuthForm'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [organization, setOrganization] = useState('')
  const [error, setError] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const res = await fetch('/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, organization }),
    })
    if (res.ok) {
      alert('Account created!')
    } else {
      const data = await res.json()
      setError(data.detail ?? 'Signup failed')
    }
  }

  return (
    <AuthForm
      title="Create Account"
      onSubmit={submit}
      error={error}
      submitLabel="Sign Up"
    >
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Organization"
        value={organization}
        onChange={(e) => setOrganization(e.target.value)}
        required
      />
    </AuthForm>
  )
}
