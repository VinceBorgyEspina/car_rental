'use server'

import { db } from '../db'
import { getSession } from '../auth'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const bookingSchema = z.object({
  carId: z.string(),
  startDate: z.string(),
  endDate: z.string(),
})

export async function createBooking(formData: FormData) {
  const session = await getSession()
  if (!session) {
    redirect('/login')
  }

  const carId = formData.get('carId') as string
  const startDateStr = formData.get('startDate') as string
  const endDateStr = formData.get('endDate') as string

  const parsed = bookingSchema.safeParse({ carId, startDate: startDateStr, endDate: endDateStr })
  if (!parsed.success) {
    throw new Error('Invalid booking details.')
  }

  const startDate = new Date(startDateStr)
  const endDate = new Date(endDateStr)

  if (startDate >= endDate) {
    throw new Error('End date must be after start date.')
  }

  if (startDate < new Date(new Date().setHours(0, 0, 0, 0))) {
    throw new Error('Start date cannot be in the past.')
  }

  // Check if car exists
  const car = await db.car.findUnique({ where: { id: carId } })
  if (!car) {
    throw new Error('Car not found.')
  }

  // Check for overlapping bookings
  const overlapping = await db.booking.findFirst({
    where: {
      carId,
      status: { not: 'CANCELLED' },
      OR: [
        {
          startDate: { lte: endDate },
          endDate: { gte: startDate },
        },
      ],
    },
  })

  if (overlapping) {
    throw new Error('Car is not available for these dates.')
  }

  // Calculate total price
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  const totalPrice = diffDays * car.pricePerDay

  // Create booking
  await db.booking.create({
    data: {
      userId: session.user.id,
      carId,
      startDate,
      endDate,
      totalPrice,
      status: 'CONFIRMED', // Mocked payment immediately confirms
    },
  })

  redirect('/dashboard')
}

export async function cancelBooking(bookingId: string) {
  const session = await getSession()
  if (!session) {
    redirect('/login')
  }

  const booking = await db.booking.findUnique({ where: { id: bookingId } })
  
  if (!booking || booking.userId !== session.user.id) {
    throw new Error('Booking not found or unauthorized')
  }

  if (booking.status === 'CANCELLED' || booking.status === 'COMPLETED') {
    throw new Error('Cannot cancel this booking')
  }

  await db.booking.update({
    where: { id: bookingId },
    data: { status: 'CANCELLED' },
  })

  redirect('/dashboard')
}
