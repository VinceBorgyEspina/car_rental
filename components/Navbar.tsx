import Link from 'next/link'
import { Car, User } from 'lucide-react'
import { getSession, destroySession } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function Navbar() {
  const session = await getSession()

  async function handleLogout() {
    'use server'
    await destroySession()
    redirect('/')
  }

  return (
    <nav className="glass sticky top-0 z-50 w-full border-b border-white/10 px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-brand-500)] text-white shadow-lg shadow-[var(--color-brand-500)]/30">
            <Car size={18} />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">LuxeRent</span>
        </Link>

        <div className="hidden space-x-8 md:flex">
          <Link href="/" className="text-sm font-medium text-[var(--color-dark-200)] transition-colors hover:text-white">
            Home
          </Link>
          <Link href="/cars" className="text-sm font-medium text-[var(--color-dark-200)] transition-colors hover:text-white">
            Fleet
          </Link>
          <Link href="/about" className="text-sm font-medium text-[var(--color-dark-200)] transition-colors hover:text-white">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium text-[var(--color-dark-200)] transition-colors hover:text-white">
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {session ? (
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="flex items-center gap-2 text-sm font-medium text-[var(--color-dark-200)] transition-colors hover:text-white">
                <User size={18} />
                <span>Dashboard</span>
              </Link>
              {session.user?.role === 'ADMIN' && (
                <Link href="/admin" className="text-sm font-medium text-[var(--color-brand-400)] hover:text-[var(--color-brand-300)]">
                  Admin
                </Link>
              )}
              <form action={handleLogout}>
                <button type="submit" className="text-sm font-medium text-red-400 transition-colors hover:text-red-300">
                  Logout
                </button>
              </form>
            </div>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium text-[var(--color-dark-200)] transition-colors hover:text-white">
                Log In
              </Link>
              <Link href="/register" className="btn-primary rounded-full px-4 py-2 text-sm">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
