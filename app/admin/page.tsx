import { db } from '@/lib/db'
import { Car, Calendar, DollarSign, Users } from 'lucide-react'

export default async function AdminOverviewPage() {
  const [totalCars, totalBookings, totalUsers, bookings] = await Promise.all([
    db.car.count(),
    db.booking.count(),
    db.user.count(),
    db.booking.findMany({
      include: { car: true, user: true },
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
  ])
  type BookingRow = (typeof bookings)[number]

  // Calculate total revenue from completed/confirmed bookings
  const revenueData = await db.booking.aggregate({
    _sum: { totalPrice: true },
    where: { status: { in: ['CONFIRMED', 'COMPLETED'] } },
  })
  
  const totalRevenue = revenueData._sum.totalPrice || 0

  return (
    <div>
      <h1 className="mb-8 text-3xl font-extrabold text-white">Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="glass-card flex flex-col p-6">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-medium text-[var(--color-dark-200)]">Total Revenue</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20 text-green-400">
              <DollarSign size={16} />
            </div>
          </div>
          <span className="text-3xl font-bold text-white">${totalRevenue.toLocaleString()}</span>
        </div>

        <div className="glass-card flex flex-col p-6">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-medium text-[var(--color-dark-200)]">Total Bookings</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
              <Calendar size={16} />
            </div>
          </div>
          <span className="text-3xl font-bold text-white">{totalBookings}</span>
        </div>

        <div className="glass-card flex flex-col p-6">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-medium text-[var(--color-dark-200)]">Fleet Size</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-brand-500)]/20 text-[var(--color-brand-400)]">
              <Car size={16} />
            </div>
          </div>
          <span className="text-3xl font-bold text-white">{totalCars}</span>
        </div>

        <div className="glass-card flex flex-col p-6">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-medium text-[var(--color-dark-200)]">Total Users</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/20 text-purple-400">
              <Users size={16} />
            </div>
          </div>
          <span className="text-3xl font-bold text-white">{totalUsers}</span>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <h2 className="mb-6 text-xl font-bold text-white">Recent Bookings</h2>
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[var(--color-dark-200)]">
            <thead className="bg-white/5 text-xs uppercase text-[var(--color-dark-300)]">
              <tr>
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
                  <td colSpan={5} className="px-6 py-8 text-center text-[var(--color-dark-300)]">
                    No bookings found.
                  </td>
                </tr>
              ) : (
                bookings.map((booking: BookingRow) => (
                  <tr key={booking.id} className="hover:bg-white/5">
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{booking.user.name}</div>
                      <div className="text-xs">{booking.user.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-white">{booking.car.make} {booking.car.model}</div>
                      <div className="text-xs">{booking.car.category}</div>
                    </td>
                    <td className="px-6 py-4">
                      {new Date(booking.startDate).toLocaleDateString()} &rarr; {new Date(booking.endDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 font-medium text-white">
                      ${booking.totalPrice}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-2 py-1 text-xs font-bold uppercase tracking-wider ${
                        booking.status === 'CONFIRMED' ? 'bg-green-500/20 text-green-400' :
                        booking.status === 'CANCELLED' ? 'bg-red-500/20 text-red-400' :
                        booking.status === 'COMPLETED' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {booking.status}
                      </span>
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
