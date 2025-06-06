import { useState } from 'react'
import AuthForm from './components/AuthForm'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const res = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    if (res.ok) {
      alert('Logged in!')
    } else {
      const data = await res.json()
      setError(data.detail ?? 'Login failed')
    }
  }

  return (
    <AuthForm
      title="Login"
      onSubmit={submit}
      error={error}
      submitLabel="Login"
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
    </AuthForm>
  )
}
