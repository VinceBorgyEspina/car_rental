import { Mail, MapPin, Phone } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Contact Us</h1>
        <p className="mt-4 text-lg text-[var(--color-dark-200)] max-w-2xl mx-auto">
          Have a question or need assistance? Our team is here to help you with your premium rental experience.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <div className="glass-card p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-500)]/20 text-[var(--color-brand-400)]">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Headquarters</h3>
                  <p className="text-[var(--color-dark-300)] mt-1">123 Luxury Drive<br/>Beverly Hills, CA 90210<br/>United States</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-500)]/20 text-[var(--color-brand-400)]">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Phone</h3>
                  <p className="text-[var(--color-dark-300)] mt-1">+1 (800) 555-LUXE</p>
                  <p className="text-sm text-[var(--color-dark-400)]">Mon-Fri 8am to 8pm PST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-500)]/20 text-[var(--color-brand-400)]">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Email</h3>
                  <p className="text-[var(--color-dark-300)] mt-1">support@luxerent.com</p>
                  <p className="text-[var(--color-dark-300)]">concierge@luxerent.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Send a Message</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-[var(--color-dark-200)]" htmlFor="firstName">First Name</label>
                <input id="firstName" type="text" className="glass-input w-full rounded-lg px-4 py-3 text-white" placeholder="John" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-[var(--color-dark-200)]" htmlFor="lastName">Last Name</label>
                <input id="lastName" type="text" className="glass-input w-full rounded-lg px-4 py-3 text-white" placeholder="Doe" />
              </div>
            </div>
            
            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--color-dark-200)]" htmlFor="email">Email Address</label>
              <input id="email" type="email" className="glass-input w-full rounded-lg px-4 py-3 text-white" placeholder="john@example.com" />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--color-dark-200)]" htmlFor="subject">Subject</label>
              <input id="subject" type="text" className="glass-input w-full rounded-lg px-4 py-3 text-white" placeholder="How can we help?" />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--color-dark-200)]" htmlFor="message">Message</label>
              <textarea id="message" rows={5} className="glass-input w-full rounded-lg px-4 py-3 text-white" placeholder="Your message here..."></textarea>
            </div>

            <button type="button" className="btn-primary w-full rounded-xl py-4 text-lg mt-4">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
