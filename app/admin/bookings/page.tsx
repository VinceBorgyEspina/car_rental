import { db } from '@/lib/db'
import { BookingStatusSelect } from '@/components/BookingStatusSelect'
import type { Booking, Car, User } from '@prisma/client'

export default async function AdminBookingsPage() {
  const bookings = await db.booking.findMany({
    include: { car: true, user: true },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white">All Bookings</h1>
        <p className="mt-2 text-[var(--color-dark-300)]">Manage customer reservations</p>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[var(--color-dark-200)]">
            <thead className="bg-white/5 text-xs uppercase text-[var(--color-dark-300)]">
              <tr>
                <th className="px-6 py-4">Booking ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Car</th>
                <th className="px-6 py-4">Dates</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-[var(--color-dark-300)]">
                    No bookings found.
                  </td>
                </tr>
              ) : (
                bookings.map((booking: Booking & { car: Car; user: User }) => (
                  <tr key={booking.id} className="hover:bg-white/5">
                    <td className="px-6 py-4 font-mono text-xs text-[var(--color-dark-300)]">
                      #{booking.id.slice(-8).toUpperCase()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{booking.user.name}</div>
                      <div className="text-xs">{booking.user.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{booking.car.make} {booking.car.model}</div>
                      <div className="text-xs">{booking.car.year} • {booking.car.category}</div>
                    </td>
                    <td className="px-6 py-4 text-xs">
                      <div>{new Date(booking.startDate).toLocaleDateString()}</div>
                      <div className="text-[var(--color-dark-400)]">→ {new Date(booking.endDate).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4 font-medium text-white">
                      ${booking.totalPrice.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <BookingStatusSelect
                        bookingId={booking.id}
                        currentStatus={booking.status}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
