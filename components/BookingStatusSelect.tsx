'use client'

import { updateBookingStatus } from '@/lib/actions/admin'
import { useTransition } from 'react'

const STATUS_STYLES: Record<string, string> = {
  PENDING: 'text-yellow-400',
  CONFIRMED: 'text-green-400',
  COMPLETED: 'text-blue-400',
  CANCELLED: 'text-red-400',
}

export function BookingStatusSelect({ bookingId, currentStatus }: { bookingId: string; currentStatus: string }) {
  const [isPending, startTransition] = useTransition()

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value
    startTransition(async () => {
      try {
        await updateBookingStatus(bookingId, newStatus)
      } catch (error: any) {
        alert(error.message || 'Failed to update status')
      }
    })
  }

  return (
    <select
      defaultValue={currentStatus}
      onChange={handleChange}
      disabled={isPending}
      className={`rounded-full border border-transparent bg-black/50 px-3 py-1 text-xs font-bold uppercase tracking-wider outline-none transition-colors hover:border-white/20 focus:border-[var(--color-brand-500)] disabled:opacity-50 ${STATUS_STYLES[currentStatus] ?? 'text-white'}`}
    >
      <option value="PENDING" className="bg-[#1a1a1b] text-yellow-400">Pending</option>
      <option value="CONFIRMED" className="bg-[#1a1a1b] text-green-400">Confirmed</option>
      <option value="COMPLETED" className="bg-[#1a1a1b] text-blue-400">Completed</option>
      <option value="CANCELLED" className="bg-[#1a1a1b] text-red-400">Cancelled</option>
    </select>
  )
}
