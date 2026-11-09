import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import { updateCar } from '@/lib/actions/car'
import Link from 'next/link'
import { ArrowLeft, Car } from 'lucide-react'

const CATEGORIES = ['Luxury', 'Sports', 'SUV', 'Sedan', 'Compact', 'Van', 'Electric']
const TRANSMISSIONS = ['Automatic', 'Manual']
const FUEL_TYPES = ['Petrol', 'Diesel', 'Electric', 'Hybrid']

export default async function EditCarPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const car = await db.car.findUnique({ where: { id } })

  if (!car) notFound()

  const updateCarWithId = updateCar.bind(null, car.id)

  return (
    <div>
      <div className="mb-8 flex items-center gap-4">
        <Link
          href="/admin/cars"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-[var(--color-dark-300)] transition-colors hover:bg-white/10 hover:text-white"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-extrabold text-white">Edit Car</h1>
          <p className="text-sm text-[var(--color-dark-300)]">{car.year} {car.make} {car.model}</p>
        </div>
      </div>

      <div className="glass-card p-8">
        <form action={updateCarWithId} className="space-y-8">
          {/* Basic Info */}
          <div>
            <h2 className="mb-6 flex items-center gap-2 text-lg font-bold text-white">
              <Car size={20} className="text-[var(--color-brand-400)]" />
              Vehicle Information
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label htmlFor="make" className="mb-2 block text-sm font-medium text-[var(--color-dark-200)]">
                  Make <span className="text-red-400">*</span>
                </label>
                <input
                  id="make"
                  name="make"
                  type="text"
                  required
                  defaultValue={car.make}
                  className="input-field w-full"
                />
              </div>

              <div>
                <label htmlFor="model" className="mb-2 block text-sm font-medium text-[var(--color-dark-200)]">
                  Model <span className="text-red-400">*</span>
                </label>
                <input
                  id="model"
                  name="model"
                  type="text"
                  required
                  defaultValue={car.model}
                  className="input-field w-full"
                />
              </div>

              <div>
                <label htmlFor="year" className="mb-2 block text-sm font-medium text-[var(--color-dark-200)]">
                  Year <span className="text-red-400">*</span>
                </label>
                <input
                  id="year"
                  name="year"
                  type="number"
                  required
                  defaultValue={car.year}
                  className="input-field w-full"
                />
              </div>

              <div>
                <label htmlFor="category" className="mb-2 block text-sm font-medium text-[var(--color-dark-200)]">
                  Category <span className="text-red-400">*</span>
                </label>
                <select id="category" name="category" required className="input-field w-full" defaultValue={car.category}>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="transmission" className="mb-2 block text-sm font-medium text-[var(--color-dark-200)]">
                  Transmission <span className="text-red-400">*</span>
                </label>
                <select id="transmission" name="transmission" required className="input-field w-full" defaultValue={car.transmission}>
                  {TRANSMISSIONS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="fuelType" className="mb-2 block text-sm font-medium text-[var(--color-dark-200)]">
                  Fuel Type <span className="text-red-400">*</span>
                </label>
                <select id="fuelType" name="fuelType" required className="input-field w-full" defaultValue={car.fuelType}>
                  {FUEL_TYPES.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Pricing & Details */}
          <div className="border-t border-white/10 pt-8">
            <h2 className="mb-6 text-lg font-bold text-white">Pricing & Details</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label htmlFor="pricePerDay" className="mb-2 block text-sm font-medium text-[var(--color-dark-200)]">
                  Price per Day ($) <span className="text-red-400">*</span>
                </label>
                <input
                  id="pricePerDay"
                  name="pricePerDay"
                  type="number"
                  required
                  defaultValue={car.pricePerDay}
                  className="input-field w-full"
                />
              </div>

              <div>
                <label htmlFor="seats" className="mb-2 block text-sm font-medium text-[var(--color-dark-200)]">
                  Seats <span className="text-red-400">*</span>
                </label>
                <input
                  id="seats"
                  name="seats"
                  type="number"
                  required
                  defaultValue={car.seats}
                  className="input-field w-full"
                />
              </div>

              <div>
                <label htmlFor="location" className="mb-2 block text-sm font-medium text-[var(--color-dark-200)]">
                  Location <span className="text-red-400">*</span>
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  required
                  defaultValue={car.location}
                  className="input-field w-full"
                />
              </div>
            </div>
          </div>

          {/* Description & Images */}
          <div className="border-t border-white/10 pt-8">
            <h2 className="mb-6 text-lg font-bold text-white">Description & Media</h2>
            <div className="space-y-6">
              <div>
                <label htmlFor="description" className="mb-2 block text-sm font-medium text-[var(--color-dark-200)]">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  defaultValue={car.description ?? ''}
                  className="input-field w-full resize-none"
                />
              </div>

              <div>
                <label htmlFor="images" className="mb-2 block text-sm font-medium text-[var(--color-dark-200)]">
                  Image URLs
                  <span className="ml-2 text-xs text-[var(--color-dark-400)]">(comma-separated)</span>
                </label>
                <input
                  id="images"
                  name="images"
                  type="text"
                  defaultValue={car.images ?? ''}
                  className="input-field w-full"
                />
              </div>

              <div>
                <label htmlFor="features" className="mb-2 block text-sm font-medium text-[var(--color-dark-200)]">
                  Features
                  <span className="ml-2 text-xs text-[var(--color-dark-400)]">(comma-separated)</span>
                </label>
                <input
                  id="features"
                  name="features"
                  type="text"
                  defaultValue={car.features ?? ''}
                  className="input-field w-full"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  id="available"
                  name="available"
                  type="checkbox"
                  defaultChecked={car.available}
                  className="h-4 w-4 rounded border-white/20 bg-black/50"
                />
                <label htmlFor="available" className="text-sm font-medium text-[var(--color-dark-200)]">
                  Available for booking
                </label>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4 border-t border-white/10 pt-8">
            <Link
              href="/admin/cars"
              className="rounded-lg border border-white/10 px-6 py-2.5 text-sm font-medium text-[var(--color-dark-200)] transition-colors hover:bg-white/5 hover:text-white"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="btn-primary rounded-lg px-6 py-2.5 text-sm font-semibold"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
