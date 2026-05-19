import Link from 'next/link'
import { Calendar, MapPin, Search, Car } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-4 pt-20 text-center">
        {/* Abstract Background Elements */}
        <div className="absolute left-1/2 top-1/2 -z-10 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-brand-600)] opacity-10 blur-[120px]" />
        
        <h1 className="mb-6 max-w-4xl text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
          Experience the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-brand-300)] to-[var(--color-brand-600)]">Extraordinary</span> on the Road
        </h1>
        
        <p className="mb-10 max-w-2xl text-lg text-[var(--color-dark-200)] sm:text-xl">
          Premium car rentals for those who demand the best. Drive your dream car today with our seamless booking experience.
        </p>

        {/* Booking Search Widget */}
        <div className="glass-card w-full max-w-4xl p-2 sm:p-4">
          <form className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex-1 text-left">
              <label className="mb-1 block pl-2 text-sm font-medium text-[var(--color-dark-200)]">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-dark-400)]" size={18} />
                <input 
                  type="text" 
                  placeholder="City, Airport, or Address" 
                  className="glass-input w-full rounded-xl py-3 pl-10 pr-4 text-white"
                />
              </div>
            </div>
            <div className="flex-1 text-left">
              <label className="mb-1 block pl-2 text-sm font-medium text-[var(--color-dark-200)]">
                Pick-up Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-dark-400)]" size={18} />
                <input 
                  type="date" 
                  className="glass-input w-full rounded-xl py-3 pl-10 pr-4 text-white"
                />
              </div>
            </div>
            <div className="flex-1 text-left">
              <label className="mb-1 block pl-2 text-sm font-medium text-[var(--color-dark-200)]">
                Drop-off Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-dark-400)]" size={18} />
                <input 
                  type="date" 
                  className="glass-input w-full rounded-xl py-3 pl-10 pr-4 text-white"
                />
              </div>
            </div>
            <button type="submit" className="btn-primary flex h-[50px] items-center justify-center gap-2 rounded-xl px-8 sm:w-auto">
              <Search size={18} />
              <span>Search</span>
            </button>
          </form>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Featured Fleet</h2>
            <p className="text-[var(--color-dark-300)]">Explore our collection of premium vehicles</p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Mocked Car Cards for UI */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card group overflow-hidden transition-all hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(247,134,17,0.15)]">
                <div className="relative h-48 w-full bg-gradient-to-br from-[var(--color-dark-800)] to-[var(--color-dark-900)]">
                  {/* We would render an image here */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-30">
                    <Car size={64} className="text-white" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">Porsche 911 GT3</h3>
                    <span className="rounded-full bg-[var(--color-brand-500)]/20 px-3 py-1 text-sm font-medium text-[var(--color-brand-400)]">
                      Sport
                    </span>
                  </div>
                  <div className="mb-6 flex items-end gap-1">
                    <span className="text-2xl font-bold text-white">$450</span>
                    <span className="mb-1 text-sm text-[var(--color-dark-300)]">/day</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/10 pt-4">
                    <div className="flex gap-4 text-sm text-[var(--color-dark-200)]">
                      <span>Automatic</span>
                      <span>2 Seats</span>
                    </div>
                    <Link href={`/cars/mock-${i}`} className="text-sm font-medium text-[var(--color-brand-400)] hover:text-[var(--color-brand-300)]">
                      View Details &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/cars" className="btn-glass inline-flex items-center justify-center rounded-full px-8 py-3 font-medium">
              View All Cars
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
