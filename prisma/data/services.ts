interface Service {
  name: string
  description: string
  pricePerHour: number
  isAvailable?: boolean
  isActive?: boolean
}

export const services: Service[] = [
  {
    name: 'Plumbing Repair',
    description: 'Fix leaks, unclog drains, and repair plumbing fixtures',
    pricePerHour: 60,
    isAvailable: true,
    isActive: true,
  },
  {
    name: 'Electrical Wiring Installation',
    description:
      'Install new electrical wiring for residential and commercial buildings',
    pricePerHour: 80,
    isAvailable: true,
    isActive: true,
  },
  {
    name: 'HVAC System Maintenance',
    description:
      'Perform regular maintenance and tune-ups on heating, ventilation, and air conditioning systems',
    pricePerHour: 70,
    isAvailable: true,
    isActive: true,
  },
  {
    name: 'Home Cleaning Service',
    description:
      'Thorough cleaning of residential properties including dusting, vacuuming, and mopping',
    pricePerHour: 40,
    isAvailable: true,
    isActive: true,
  },
  {
    name: 'Lawn Care and Maintenance',
    description:
      'Mow lawns, trim bushes, and maintain outdoor landscaping for residential and commercial properties',
    pricePerHour: 50,
    isAvailable: true,
    isActive: true,
  },
  {
    name: 'IT Support Services',
    description:
      'Provide technical support for computers, networks, and software applications',
    pricePerHour: 100,
    isAvailable: true,
    isActive: true,
  },
  {
    name: 'Graphic Design Services',
    description:
      'Create custom logos, brochures, and marketing materials for businesses',
    pricePerHour: 90,
    isAvailable: true,
    isActive: true,
  },
  {
    name: 'Personal Training Sessions',
    description:
      'One-on-one fitness training sessions tailored to individual goals and needs',
    pricePerHour: 75,
    isAvailable: true,
    isActive: true,
  },
  {
    name: 'Tutoring Services',
    description:
      'Provide academic tutoring for students in various subjects and grade levels',
    pricePerHour: 60,
    isAvailable: true,
    isActive: true,
  },
  {
    name: 'Event Planning Services',
    description:
      'Plan and coordinate events such as weddings, parties, and corporate functions',
    pricePerHour: 110,
    isAvailable: true,
    isActive: true,
  },
]
