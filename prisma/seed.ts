import { db as prisma } from '../lib/db'
import bcrypt from 'bcryptjs'

async function main() {
  console.log('Seeding database...')

  // 1. Create Admin User
  const adminPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@luxerent.com' },
    update: {},
    create: {
      email: 'admin@luxerent.com',
      name: 'Admin User',
      passwordHash: adminPassword,
      role: 'ADMIN',
    },
  })
  console.log('Admin user created:', admin.email)

  // 2. Create Customer User
  const customerPassword = await bcrypt.hash('customer123', 10)
  const customer = await prisma.user.upsert({
    where: { email: 'john@example.com' },
    update: {},
    create: {
      email: 'john@example.com',
      name: 'John Doe',
      passwordHash: customerPassword,
      role: 'CUSTOMER',
    },
  })
  console.log('Customer user created:', customer.email)

  // 3. Clear existing cars
  await prisma.car.deleteMany({})

  // 4. Create Cars
  const cars = [
    {
      make: 'Porsche',
      model: '911 GT3',
      year: 2024,
      category: 'Sports',
      pricePerDay: 450,
      seats: 2,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      images: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
      location: 'Los Angeles, CA',
      description: 'Experience pure driving pleasure with the Porsche 911 GT3. A true sports car for enthusiasts who demand the very best.',
      features: 'Sport Chrono Package,Carbon Fiber Interior,Bose Surround Sound,PDK Gearbox,Launch Control,GPS Navigation',
    },
    {
      make: 'Mercedes-Benz',
      model: 'G 63 AMG',
      year: 2023,
      category: 'SUV',
      pricePerDay: 350,
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      images: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?w=800&q=80',
      location: 'Miami, FL',
      description: 'The iconic G-Wagon offers unmatched luxury and presence on the road. Perfect for making a bold statement wherever you go.',
      features: 'AMG Performance Exhaust,Burmester Sound System,Heated & Ventilated Seats,360° Camera,Adaptive Cruise Control,Massage Seats',
    },
    {
      make: 'Tesla',
      model: 'Model S Plaid',
      year: 2024,
      category: 'Luxury',
      pricePerDay: 250,
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Electric',
      images: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80',
      location: 'San Francisco, CA',
      description: 'Ludicrous speed meets elegant comfort. The Model S Plaid is the ultimate electric luxury sedan with 1,020 horsepower.',
      features: 'Autopilot,Full Self-Driving Capability,17" Cinematic Display,Over-the-Air Updates,Premium Audio,Supercharger Access',
    },
    {
      make: 'Lamborghini',
      model: 'Huracán EVO',
      year: 2023,
      category: 'Sports',
      pricePerDay: 799,
      seats: 2,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      images: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
      location: 'Las Vegas, NV',
      description: 'Unleash 630 horsepower in this mid-engine masterpiece. The Huracán EVO is a visceral, intoxicating supercar experience.',
      features: 'LDVI AI Dynamics System,Magnetorheological Suspension,Carbon Ceramic Brakes,Apple CarPlay,Alcantara Interior,Launch Control',
    },
    {
      make: 'Range Rover',
      model: 'Sport SVR',
      year: 2024,
      category: 'SUV',
      pricePerDay: 295,
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      images: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&q=80',
      location: 'New York, NY',
      description: 'The most dynamic Range Rover ever built. Supercharged V8 power with unrivalled luxury refinement and off-road capability.',
      features: 'Pixel-Laser LED Headlights,Meridian Sound System,Air Suspension,4-Zone Climate Control,Head-Up Display,Terrain Response 2',
    },
    {
      make: 'BMW',
      model: 'M5 Competition',
      year: 2024,
      category: 'Sedan',
      pricePerDay: 320,
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Petrol',
      images: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
      location: 'Chicago, IL',
      description: 'The BMW M5 Competition is the epitome of the sports saloon. Combining everyday usability with supercar performance.',
      features: 'M xDrive AWD,Carbon Fiber Roof,Harman Kardon Sound,Adaptive M Suspension,M Compound Brakes,Night Vision Camera',
    },
  ]

  for (const car of cars) {
    await prisma.car.create({ data: car })
  }
  console.log(`Created ${cars.length} cars.`)

  console.log('Seeding finished.')
  console.log('\nCredentials:')
  console.log('  Admin  → admin@luxerent.com / admin123')
  console.log('  Customer → john@example.com / customer123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
