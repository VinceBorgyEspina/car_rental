import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Car, LayoutDashboard, Calendar } from 'lucide-react'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()
  
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/')
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row lg:px-8">
      {/* Admin Sidebar */}
      <div className="w-full md:w-64">
        <div className="glass-card sticky top-24 flex flex-col gap-2 p-4">
          <div className="mb-4 border-b border-white/10 pb-4">
            <h3 className="font-bold text-white">Admin Panel</h3>
            <p className="text-sm text-[var(--color-brand-400)]">LuxeRent Management</p>
          </div>
          
          <Link href="/admin" className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-[var(--color-dark-200)] hover:bg-[var(--color-brand-500)]/20 hover:text-[var(--color-brand-400)]">
            <LayoutDashboard size={18} />
            Overview
          </Link>
          <Link href="/admin/cars" className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-[var(--color-dark-200)] hover:bg-[var(--color-brand-500)]/20 hover:text-[var(--color-brand-400)]">
            <Car size={18} />
            Fleet Management
          </Link>
          <Link href="/admin/bookings" className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-[var(--color-dark-200)] hover:bg-[var(--color-brand-500)]/20 hover:text-[var(--color-brand-400)]">
            <Calendar size={18} />
            Bookings
          </Link>
        </div>
      </div>

      {/* Admin Content */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  )
}
