import { db } from '@/lib/db'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { format } from 'date-fns'
import Link from 'next/link'
import { Calendar, Car as CarIcon, MapPin } from 'lucide-react'
import { cancelBooking } from '@/lib/actions/booking'

export default async function DashboardPage() {
  const session = await getSession()
  if (!session) {
    redirect('/login')
  }

  const [user, bookings] = await Promise.all([
    db.user.findUnique({ where: { id: session.user.id }, select: { name: true, email: true } }),
    db.booking.findMany({
      where: { userId: session.user.id },
      include: { car: true },
      orderBy: { createdAt: 'desc' },
    }),
  ])

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">Your Dashboard</h1>
        <p className="mt-2 text-lg text-[var(--color-dark-200)]">Manage your bookings and account</p>
      </div>

      <div className="flex flex-col gap-8 md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-64">
          <div className="glass-card sticky top-24 flex flex-col gap-2 p-4">
            <div className="mb-4 border-b border-white/10 pb-4">
              <h3 className="font-bold text-white">{user?.name ?? 'Account'}</h3>
              <p className="text-sm text-[var(--color-dark-300)]">{session.user.email}</p>
            </div>
            <Link href="/dashboard" className="rounded-lg bg-[var(--color-brand-500)]/20 px-4 py-2 text-sm font-medium text-[var(--color-brand-400)]">
              My Bookings
            </Link>
            <Link href="/dashboard/settings" className="rounded-lg px-4 py-2 text-sm font-medium text-[var(--color-dark-200)] hover:bg-white/5 hover:text-white">
              Account Settings
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <h2 className="mb-6 text-2xl font-bold text-white">Recent Bookings</h2>
          
          {bookings.length === 0 ? (
            <div className="glass-card flex flex-col items-center justify-center p-12 text-center">
              <Calendar size={48} className="mb-4 text-[var(--color-dark-400)]" />
              <h3 className="text-xl font-bold text-white">No bookings yet</h3>
              <p className="mt-2 text-[var(--color-dark-300)]">You haven't rented any cars yet.</p>
              <Link href="/cars" className="btn-primary mt-6 rounded-full px-6 py-2">
                Browse Fleet
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {bookings.map((booking) => (
                <div key={booking.id} className="glass-card flex flex-col overflow-hidden sm:flex-row">
                  {/* Car Image (mocked) */}
                  <div className="h-48 w-full shrink-0 bg-gradient-to-br from-[var(--color-dark-800)] to-[var(--color-dark-900)] sm:h-auto sm:w-48">
                    {booking.car.images ? (
                      <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(${booking.car.images.split(',')[0]})` }} />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <CarIcon size={48} className="text-white/20" />
                      </div>
                    )}
                  </div>
                  
                  {/* Booking Details */}
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <h3 className="text-xl font-bold text-white">{booking.car.make} {booking.car.model}</h3>
                        <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                          booking.status === 'CONFIRMED' ? 'bg-green-500/20 text-green-400' :
                          booking.status === 'CANCELLED' ? 'bg-red-500/20 text-red-400' :
                          booking.status === 'COMPLETED' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                      
                      <div className="mb-4 grid grid-cols-1 gap-2 text-sm text-[var(--color-dark-200)] sm:grid-cols-2">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          <span>{format(new Date(booking.startDate), 'MMM dd, yyyy')} - {format(new Date(booking.endDate), 'MMM dd, yyyy')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={16} />
                          <span>{booking.car.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-end justify-between border-t border-white/10 pt-4">
                      <div>
                        <span className="block text-xs text-[var(--color-dark-300)]">Total Amount</span>
                        <span className="text-xl font-bold text-white">${booking.totalPrice.toLocaleString()}</span>
                      </div>
                      
                      {booking.status === 'CONFIRMED' || booking.status === 'PENDING' ? (
                        <form action={async () => {
                          'use server';
                          await cancelBooking(booking.id);
                        }}>
                          <button type="submit" className="text-sm font-medium text-red-400 transition-colors hover:text-red-300">
                            Cancel Booking
                          </button>
                        </form>
                      ) : (
                        <Link href={`/cars/${booking.carId}`} className="text-sm font-medium text-[var(--color-brand-400)] transition-colors hover:text-[var(--color-brand-300)]">
                          Book Again
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
