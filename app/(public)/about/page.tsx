import { Car, Shield, Star, Users } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">About LuxeRent</h1>
        <p className="mt-4 text-lg text-[var(--color-dark-200)] max-w-2xl mx-auto">
          We provide an unparalleled premium car rental experience, ensuring every journey is memorable, safe, and exceptional.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
        <div className="relative h-[400px] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--color-dark-800)] to-[var(--color-dark-900)]">
          <div className="absolute inset-0 bg-cover bg-center opacity-80" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071&auto=format&fit=crop)' }} />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
          <p className="text-[var(--color-dark-200)] leading-relaxed mb-6">
            At LuxeRent, we believe that the journey is just as important as the destination. Our mission is to elevate your travel experience by offering a meticulously curated fleet of luxury vehicles.
          </p>
          <p className="text-[var(--color-dark-200)] leading-relaxed">
            Whether you need a sophisticated sedan for a business meeting, a thrilling sports car for a weekend escape, or a spacious SUV for a family adventure, we have the perfect vehicle to meet your exacting standards.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="glass-card p-8 text-center flex flex-col items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-brand-500)]/20 text-[var(--color-brand-400)] mb-4">
            <Car size={32} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Premium Fleet</h3>
          <p className="text-sm text-[var(--color-dark-300)]">Curated selection of top-tier vehicles.</p>
        </div>
        
        <div className="glass-card p-8 text-center flex flex-col items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-brand-500)]/20 text-[var(--color-brand-400)] mb-4">
            <Shield size={32} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Fully Insured</h3>
          <p className="text-sm text-[var(--color-dark-300)]">Comprehensive coverage for your peace of mind.</p>
        </div>

        <div className="glass-card p-8 text-center flex flex-col items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-brand-500)]/20 text-[var(--color-brand-400)] mb-4">
            <Star size={32} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Top Service</h3>
          <p className="text-sm text-[var(--color-dark-300)]">Award-winning customer support 24/7.</p>
        </div>

        <div className="glass-card p-8 text-center flex flex-col items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-brand-500)]/20 text-[var(--color-brand-400)] mb-4">
            <Users size={32} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Expert Team</h3>
          <p className="text-sm text-[var(--color-dark-300)]">Dedicated professionals at your service.</p>
        </div>
      </div>
    </div>
  )
}
