import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import { Car as CarIcon, Check, Fuel, MapPin, Settings, Users } from 'lucide-react'
import { createBooking } from '@/lib/actions/booking'

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  
  const car = await db.car.findUnique({
    where: { id },
  })

  if (!car) {
    notFound()
  }

  // Parse images and features
  const images = car.images ? car.images.split(',').map(s => s.trim()) : []
  const features = car.features ? car.features.split(',').map(s => s.trim()) : []

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Car Header & Gallery */}
      <div className="mb-12 flex flex-col gap-8 lg:flex-row">
        {/* Main Image */}
        <div className="flex-1">
          <div className="relative h-[400px] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--color-dark-800)] to-[var(--color-dark-900)] sm:h-[500px]">
            {images.length > 0 ? (
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${images[0]})` }} />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <CarIcon size={120} className="text-white/10" />
              </div>
            )}
          </div>
          
          {/* Thumbnails (Mocked if no images) */}
          {images.length > 1 && (
            <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
              {images.slice(1).map((img, idx) => (
                <div key={idx} className="h-24 w-32 shrink-0 cursor-pointer overflow-hidden rounded-lg border-2 border-transparent bg-[var(--color-dark-800)] hover:border-[var(--color-brand-500)]">
                  <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(${img})` }} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Booking Card */}
        <div className="w-full lg:w-96">
          <div className="glass-card sticky top-24 p-6">
            <h2 className="mb-2 text-3xl font-bold text-white">{car.make} {car.model}</h2>
            <div className="mb-6 flex items-center gap-2 text-[var(--color-dark-300)]">
              <MapPin size={16} />
              <span>{car.location}</span>
            </div>

            <div className="mb-8 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-white">${car.pricePerDay}</span>
              <span className="text-lg text-[var(--color-dark-300)]">/ day</span>
            </div>

            {/* Booking Form */}
            <form action={createBooking} className="space-y-4 border-t border-white/10 pt-6">
              <input type="hidden" name="carId" value={car.id} />
              
              <div>
                <label className="mb-1 block text-sm font-medium text-[var(--color-dark-200)]">
                  Start Date
                </label>
                <input 
                  type="date" 
                  name="startDate"
                  required
                  className="glass-input w-full rounded-lg px-4 py-3 text-white"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-[var(--color-dark-200)]">
                  End Date
                </label>
                <input 
                  type="date" 
                  name="endDate"
                  required
                  className="glass-input w-full rounded-lg px-4 py-3 text-white"
                />
              </div>

              <div className="pt-4">
                <button type="submit" className="btn-primary w-full rounded-xl py-4 text-lg">
                  Book Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Car Details & Specs */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h3 className="mb-6 text-2xl font-bold text-white">About this car</h3>
          <p className="mb-10 leading-relaxed text-[var(--color-dark-200)]">
            {car.description || "Experience the thrill of driving this meticulously maintained vehicle. Perfect for weekend getaways, business trips, or making a statement. This car offers a blend of performance, comfort, and advanced technology."}
          </p>

          <h3 className="mb-6 text-2xl font-bold text-white">Specifications</h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="glass-card flex flex-col items-center justify-center p-4 text-center">
              <Users size={24} className="mb-2 text-[var(--color-brand-400)]" />
              <span className="text-sm text-[var(--color-dark-300)]">Seats</span>
              <span className="font-bold text-white">{car.seats}</span>
            </div>
            <div className="glass-card flex flex-col items-center justify-center p-4 text-center">
              <Settings size={24} className="mb-2 text-[var(--color-brand-400)]" />
              <span className="text-sm text-[var(--color-dark-300)]">Transmission</span>
              <span className="font-bold text-white">{car.transmission}</span>
            </div>
            <div className="glass-card flex flex-col items-center justify-center p-4 text-center">
              <Fuel size={24} className="mb-2 text-[var(--color-brand-400)]" />
              <span className="text-sm text-[var(--color-dark-300)]">Fuel</span>
              <span className="font-bold text-white">{car.fuelType}</span>
            </div>
            <div className="glass-card flex flex-col items-center justify-center p-4 text-center">
              <CarIcon size={24} className="mb-2 text-[var(--color-brand-400)]" />
              <span className="text-sm text-[var(--color-dark-300)]">Year</span>
              <span className="font-bold text-white">{car.year}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-6 text-2xl font-bold text-white">Features</h3>
          {features.length > 0 ? (
            <ul className="space-y-4">
              {features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-[var(--color-dark-200)]">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-500)]/20 text-[var(--color-brand-400)]">
                    <Check size={14} />
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[var(--color-dark-400)]">No features listed for this vehicle.</p>
          )}
        </div>
      </div>
    </div>
  )
}
