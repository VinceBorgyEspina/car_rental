import Link from 'next/link'
import { Car } from 'lucide-react'
import { register } from '@/lib/actions/auth'

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="glass-card w-full max-w-md p-8">
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-brand-500)] text-white shadow-lg shadow-[var(--color-brand-500)]/30">
            <Car size={24} />
          </div>
          <h1 className="text-2xl font-bold text-white">Create an account</h1>
          <p className="mt-2 text-sm text-[var(--color-dark-300)]">Join us to book your perfect ride</p>
        </div>

        <form action={register} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--color-dark-200)]" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="glass-input w-full rounded-lg px-4 py-2 text-white"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--color-dark-200)]" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="glass-input w-full rounded-lg px-4 py-2 text-white"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--color-dark-200)]" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="glass-input w-full rounded-lg px-4 py-2 text-white"
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="btn-primary mt-6 w-full rounded-lg py-2">
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[var(--color-dark-300)]">
          Already have an account?{' '}
          <Link href="/login" className="text-[var(--color-brand-400)] hover:text-[var(--color-brand-300)]">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
