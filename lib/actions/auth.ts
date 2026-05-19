'use server'

import { db } from '../db'
import { hashPassword, verifyPassword, setSession, destroySession } from '../auth'
import { z } from 'zod'
import { redirect } from 'next/navigation'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const parsed = loginSchema.safeParse({ email, password })
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message)
  }

  const user = await db.user.findUnique({ where: { email } })
  if (!user) {
    throw new Error('Invalid email or password')
  }

  const isValid = await verifyPassword(password, user.passwordHash)
  if (!isValid) {
    throw new Error('Invalid email or password')
  }

  await setSession({ id: user.id, email: user.email, role: user.role })
  
  redirect('/dashboard')
}

export async function register(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const parsed = registerSchema.safeParse({ name, email, password })
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message)
  }

  const existingUser = await db.user.findUnique({ where: { email } })
  if (existingUser) {
    throw new Error('User already exists with this email')
  }

  const passwordHash = await hashPassword(password)
  const user = await db.user.create({
    data: {
      name,
      email,
      passwordHash,
    },
  })

  await setSession({ id: user.id, email: user.email, role: user.role })
  
  redirect('/dashboard')
}

export async function logout() {
  await destroySession()
  redirect('/login')
}
