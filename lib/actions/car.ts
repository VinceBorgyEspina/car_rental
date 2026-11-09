'use server'

import { db } from '../db'
import { getSession } from '../auth'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const carSchema = z.object({
  make: z.string().min(1, 'Make is required'),
  model: z.string().min(1, 'Model is required'),
  year: z.coerce.number().int().min(1990).max(new Date().getFullYear() + 1),
  category: z.string().min(1, 'Category is required'),
  pricePerDay: z.coerce.number().positive('Price must be positive'),
  seats: z.coerce.number().int().min(1).max(20),
  transmission: z.string().min(1, 'Transmission is required'),
  fuelType: z.string().min(1, 'Fuel type is required'),
  location: z.string().min(1, 'Location is required'),
  description: z.string().optional(),
  images: z.string().optional(),
  features: z.string().optional(),
  available: z.coerce.boolean().optional().default(true),
})

async function requireAdmin() {
  const session = await getSession()
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/')
  }
  return session
}

export async function createCar(formData: FormData) {
  await requireAdmin()

  const raw = {
    make: formData.get('make') as string,
    model: formData.get('model') as string,
    year: formData.get('year') as string,
    category: formData.get('category') as string,
    pricePerDay: formData.get('pricePerDay') as string,
    seats: formData.get('seats') as string,
    transmission: formData.get('transmission') as string,
    fuelType: formData.get('fuelType') as string,
    location: formData.get('location') as string,
    description: formData.get('description') as string,
    images: formData.get('images') as string,
    features: formData.get('features') as string,
    available: formData.get('available') === 'on' || formData.get('available') === 'true',
  }

  const parsed = carSchema.safeParse(raw)
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message)
  }

  await db.car.create({ data: parsed.data })

  revalidatePath('/admin/cars')
  revalidatePath('/cars')
  redirect('/admin/cars')
}

export async function updateCar(id: string, formData: FormData) {
  await requireAdmin()

  const raw = {
    make: formData.get('make') as string,
    model: formData.get('model') as string,
    year: formData.get('year') as string,
    category: formData.get('category') as string,
    pricePerDay: formData.get('pricePerDay') as string,
    seats: formData.get('seats') as string,
    transmission: formData.get('transmission') as string,
    fuelType: formData.get('fuelType') as string,
    location: formData.get('location') as string,
    description: formData.get('description') as string,
    images: formData.get('images') as string,
    features: formData.get('features') as string,
    available: formData.get('available') === 'on' || formData.get('available') === 'true',
  }

  const parsed = carSchema.safeParse(raw)
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message)
  }

  await db.car.update({ where: { id }, data: parsed.data })

  revalidatePath('/admin/cars')
  revalidatePath('/cars')
  revalidatePath(`/cars/${id}`)
  redirect('/admin/cars')
}

export async function deleteCar(id: string) {
  await requireAdmin()

  // Check if there are active bookings
  const activeBookings = await db.booking.count({
    where: {
      carId: id,
      status: { in: ['PENDING', 'CONFIRMED'] },
    },
  })

  if (activeBookings > 0) {
    throw new Error('Cannot delete a car with active bookings. Cancel all bookings first.')
  }

  await db.car.delete({ where: { id } })

  revalidatePath('/admin/cars')
  revalidatePath('/cars')
}
