import { NextResponse } from 'next/server'
import { hash } from 'bcrypt'
import { openDb } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()
    const hashedPassword = await hash(password, 10)

    const db = await openDb()
    await db.run(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    )

    return NextResponse.json({ message: 'User registered successfully' })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { message: 'An error occurred during registration' },
      { status: 500 }
    )
  }
}

