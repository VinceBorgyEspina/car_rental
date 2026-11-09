'use client'

import { deleteCar } from '@/lib/actions/car'
import { Trash2 } from 'lucide-react'
import { useTransition } from 'react'

export function DeleteCarButton({ carId }: { carId: string }) {
  const [isPending, startTransition] = useTransition()

  function handleDelete() {
    if (!confirm('Are you sure you want to delete this car? This action cannot be undone.')) return

    startTransition(async () => {
      try {
        await deleteCar(carId)
      } catch (error: any) {
        alert(error.message || 'Failed to delete car')
      }
    })
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="rounded p-2 text-[var(--color-dark-300)] transition-colors hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
      title="Delete car"
    >
      <Trash2 size={16} />
    </button>
  )
}
