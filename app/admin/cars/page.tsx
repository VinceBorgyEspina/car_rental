import { db } from '@/lib/db'
import Link from 'next/link'
import { Plus, Edit } from 'lucide-react'
import { DeleteCarButton } from '@/components/DeleteCarButton'

export default async function AdminCarsPage() {
  const cars = await db.car.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-white">Fleet Management</h1>
        <Link
          href="/admin/cars/new"
          className="btn-primary flex items-center gap-2 rounded-lg px-4 py-2 text-sm"
        >
          <Plus size={16} />
          Add New Car
        </Link>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[var(--color-dark-200)]">
            <thead className="bg-white/5 text-xs uppercase text-[var(--color-dark-300)]">
              <tr>
                <th className="px-6 py-4">Car</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price/Day</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {cars.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-[var(--color-dark-300)]">
                    No cars found. Click 'Add New Car' to build your fleet.
                  </td>
                </tr>
              ) : (
                cars.map((car) => (
                  <tr key={car.id} className="hover:bg-white/5">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-16 shrink-0 overflow-hidden rounded-md bg-[var(--color-dark-800)]">
                          {car.images && (
                            <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(${car.images.split(',')[0].trim()})` }} />
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-white">{car.make} {car.model}</div>
                          <div className="text-xs">{car.year} • {car.location}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {car.category}
                    </td>
                    <td className="px-6 py-4 font-medium text-white">
                      ${car.pricePerDay}
                    </td>
                    <td className="px-6 py-4">
                      {car.available ? (
                        <span className="rounded-full bg-green-500/20 px-2 py-1 text-xs font-bold uppercase tracking-wider text-green-400">
                          Available
                        </span>
                      ) : (
                        <span className="rounded-full bg-red-500/20 px-2 py-1 text-xs font-bold uppercase tracking-wider text-red-400">
                          Unavailable
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/cars/${car.id}/edit`}
                          className="rounded p-2 text-[var(--color-dark-300)] transition-colors hover:bg-white/10 hover:text-white"
                          title="Edit car"
                        >
                          <Edit size={16} />
                        </Link>
                        <DeleteCarButton carId={car.id} />
                      </div>
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
