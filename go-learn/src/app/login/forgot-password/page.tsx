'use client'

import { requestUserPasswordChange } from '@/actions/authActions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export default function ForgotPasswordPage() {

  const [username, setUsername] = useState<string>('')

  return (
    <div>
      <h1>Forgot Password</h1>

      <p>Enter your username and we&apos;ll send you a link to reset your password.</p>

      <form onSubmit={async (e) => {
        e.preventDefault()
        await requestUserPasswordChange(username)
      }}>
        <Input placeholder="username" value={username} onChange={(e)=>{ setUsername(e.target.value) }} />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  )
}