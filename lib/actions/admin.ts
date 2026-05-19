'use server'

import { db } from '../db'
import { getSession } from '../auth'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

async function requireAdmin() {
  const session = await getSession()
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/')
  }
}

export async function updateBookingStatus(bookingId: string, status: string) {
  await requireAdmin()

  const validStatuses = ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED']
  if (!validStatuses.includes(status)) {
    throw new Error('Invalid booking status')
  }

  await db.booking.update({
    where: { id: bookingId },
    data: { status },
  })

  revalidatePath('/admin/bookings')
  revalidatePath('/admin')
  revalidatePath('/dashboard')
}
