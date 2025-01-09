import React, { useState } from 'react'
import { Input } from '../components/input'
import { Button } from '../components/button'

interface FormProps {
  onSubmit: (username: string) => void
}

export function Form({ onSubmit }: FormProps) {
  const [username, setUsername] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(username)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <Button type="submit">Submit</Button>
    </form>
  )
}

