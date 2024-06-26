import { ConsumerType, PersonGender } from '@prisma/client'

interface Person {
  dni: string
  name: string
  secondName?: string
  lastName: string
  secondLastName?: string
  gender?: PersonGender
  email?: string
  phone?: string
  birthdate?: Date
  locationId: number
}

interface Consumer {
  type: ConsumerType
  isCustomer?: boolean
  isActive?: boolean
  personId: number
}

export const consumersPeople: Person[] = [
  { dni: '1234567890', name: 'Juan', lastName: 'Pérez', locationId: 1 },
  { dni: '2345678901', name: 'María', lastName: 'González', locationId: 2 },
  { dni: '3456789012', name: 'Carlos', lastName: 'López', locationId: 3 },
  { dni: '4567890123', name: 'Ana', lastName: 'Martínez', locationId: 4 },
  { dni: '5678901234', name: 'Pedro', lastName: 'Sánchez', locationId: 5 },
  { dni: '6789012345', name: 'Laura', lastName: 'Rodríguez', locationId: 6 },
  { dni: '7890123456', name: 'Miguel', lastName: 'Fernández', locationId: 7 },
  { dni: '8901234567', name: 'Carmen', lastName: 'Gómez', locationId: 8 },
  { dni: '9012345678', name: 'Alejandro', lastName: 'Díaz', locationId: 9 },
  { dni: '0123456789', name: 'Sofía', lastName: 'Hernández', locationId: 10 },
  { dni: '1357924680', name: 'Daniel', lastName: 'Vázquez', locationId: 1 },
  { dni: '2468013579', name: 'Elena', lastName: 'Torres', locationId: 2 },
  { dni: '9876543210', name: 'Javier', lastName: 'Ruiz', locationId: 3 },
  { dni: '8765432109', name: 'Paula', lastName: 'Jiménez', locationId: 4 },
  { dni: '7654321098', name: 'Adrián', lastName: 'García', locationId: 5 },
  { dni: '6543210987', name: 'Lucía', lastName: 'López', locationId: 6 },
  { dni: '5432109876', name: 'Diego', lastName: 'Martín', locationId: 7 },
  { dni: '4321098765', name: 'Isabel', lastName: 'Pérez', locationId: 8 },
  { dni: '3210987654', name: 'Marcos', lastName: 'Sánchez', locationId: 9 },
]

export const consumers: Consumer[] = [
  {
    type: ConsumerType.NATURAL,
    isCustomer: true,
    isActive: true,
    personId: 1,
  },
  {
    type: ConsumerType.NATURAL,
    isCustomer: true,
    isActive: true,
    personId: 2,
  },
  {
    type: ConsumerType.COMPANY,
    isCustomer: true,
    isActive: true,
    personId: 3,
  },
  {
    type: ConsumerType.NATURAL,
    isCustomer: true,
    isActive: true,
    personId: 4,
  },
  {
    type: ConsumerType.COMPANY,
    isCustomer: true,
    isActive: true,
    personId: 5,
  },
  {
    type: ConsumerType.NATURAL,
    isCustomer: true,
    isActive: true,
    personId: 6,
  },
  {
    type: ConsumerType.NATURAL,
    isCustomer: true,
    isActive: true,
    personId: 7,
  },
  {
    type: ConsumerType.COMPANY,
    isCustomer: true,
    isActive: true,
    personId: 8,
  },
  {
    type: ConsumerType.NATURAL,
    isCustomer: true,
    isActive: true,
    personId: 9,
  },
  {
    type: ConsumerType.NATURAL,
    isCustomer: true,
    isActive: true,
    personId: 10,
  },
  {
    type: ConsumerType.COMPANY,
    isCustomer: true,
    isActive: true,
    personId: 11,
  },
  {
    type: ConsumerType.NATURAL,
    isCustomer: true,
    isActive: true,
    personId: 12,
  },
  {
    type: ConsumerType.NATURAL,
    isCustomer: true,
    isActive: true,
    personId: 13,
  },
  {
    type: ConsumerType.COMPANY,
    isCustomer: true,
    isActive: true,
    personId: 14,
  },
  {
    type: ConsumerType.NATURAL,
    isCustomer: true,
    isActive: true,
    personId: 15,
  },
  {
    type: ConsumerType.NATURAL,
    isCustomer: true,
    isActive: true,
    personId: 16,
  },
  {
    type: ConsumerType.COMPANY,
    isCustomer: true,
    isActive: true,
    personId: 17,
  },
  {
    type: ConsumerType.NATURAL,
    isCustomer: true,
    isActive: true,
    personId: 18,
  },
  {
    type: ConsumerType.NATURAL,
    isCustomer: true,
    isActive: true,
    personId: 19,
  },
]
