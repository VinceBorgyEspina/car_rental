import Link from 'next/link'
import { Car as CarIcon, Filter, Settings, Users, Fuel } from 'lucide-react'
import { db } from '@/lib/db'

export default async function CarsPage() {
  const cars = await db.car.findMany()

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="mb-4 text-4xl font-extrabold text-white sm:text-5xl">Our Premium Fleet</h1>
        <p className="mx-auto max-w-2xl text-lg text-[var(--color-dark-200)]">
          Choose from our selection of luxury, sports, and comfort vehicles. Each car is meticulously maintained to provide you with the perfect driving experience.
        </p>
      </div>

      <div className="flex flex-col gap-8 md:flex-row">
        {/* Filters Sidebar */}
        <div className="w-full md:w-64">
          <div className="glass-card sticky top-24 p-6">
            <div className="mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
              <Filter size={20} className="text-[var(--color-brand-400)]" />
              <h2 className="text-lg font-bold text-white">Filters</h2>
            </div>

            {/* Mocked Filters for now */}
            <div className="space-y-6">
              <div>
                <h3 className="mb-3 text-sm font-medium text-[var(--color-dark-200)]">Category</h3>
                <div className="space-y-2">
                  {['Luxury', 'Sports', 'SUV', 'Sedan'].map((cat) => (
                    <label key={cat} className="flex items-center gap-3">
                      <input type="checkbox" className="h-4 w-4 rounded border-white/20 bg-black/50 text-[var(--color-brand-500)]" />
                      <span className="text-sm text-white">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-medium text-[var(--color-dark-200)]">Transmission</h3>
                <div className="space-y-2">
                  {['Automatic', 'Manual'].map((trans) => (
                    <label key={trans} className="flex items-center gap-3">
                      <input type="checkbox" className="h-4 w-4 rounded border-white/20 bg-black/50 text-[var(--color-brand-500)]" />
                      <span className="text-sm text-white">{trans}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cars Grid */}
        <div className="flex-1">
          {cars.length === 0 ? (
            <div className="glass-card flex flex-col items-center justify-center p-12 text-center">
              <CarIcon size={48} className="mb-4 text-[var(--color-dark-400)]" />
              <h3 className="text-xl font-bold text-white">No cars available</h3>
              <p className="mt-2 text-[var(--color-dark-300)]">We're currently updating our fleet. Please check back soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cars.map((car) => (
                <Link key={car.id} href={`/cars/${car.id}`} className="group block">
                  <div className="glass-card h-full overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(247,134,17,0.15)]">
                    <div className="relative h-48 w-full bg-[var(--color-dark-800)]">
                      {/* Image placeholder */}
                      {car.images ? (
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${car.images.split(',')[0]})` }} />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[var(--color-dark-800)] to-[var(--color-dark-900)]">
                          <CarIcon size={48} className="text-white/20" />
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="mb-2 flex items-center justify-between">
                        <h3 className="text-lg font-bold text-white">{car.make} {car.model}</h3>
                        <span className="rounded-full bg-[var(--color-brand-500)]/20 px-2 py-1 text-xs font-medium text-[var(--color-brand-400)]">
                          {car.category}
                        </span>
                      </div>
                      <div className="mb-4 text-sm text-[var(--color-dark-300)]">{car.year}</div>
                      
                      <div className="mb-6 grid grid-cols-2 gap-y-3 gap-x-2 text-xs text-[var(--color-dark-200)]">
                        <div className="flex items-center gap-1">
                          <Users size={14} className="text-[var(--color-brand-400)]" />
                          <span>{car.seats} Seats</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Settings size={14} className="text-[var(--color-brand-400)]" />
                          <span>{car.transmission}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Fuel size={14} className="text-[var(--color-brand-400)]" />
                          <span>{car.fuelType}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-end justify-between border-t border-white/10 pt-4">
                        <div>
                          <span className="text-2xl font-bold text-white">${car.pricePerDay}</span>
                          <span className="text-xs text-[var(--color-dark-300)]">/day</span>
                        </div>
                        <span className="text-sm font-medium text-[var(--color-brand-400)] group-hover:text-[var(--color-brand-300)]">
                          View &rarr;
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
