import { Logger } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { brands } from './data/brands'
import { categories } from './data/categories'
import { locations } from './data/locations'
import { consumers, consumersPeople } from './data/consumers'
import { employees, employeesPeople } from './data/employees'
import { modules } from './data/modules'
import { payMethods } from './data/pay-methods'
import { products } from './data/products'
import { services } from './data/services'
import { quotas } from './data/quotas'
import { permissions } from './data/permissions'

const prisma = new PrismaClient()

const main = async () => {
  await prisma.brand.createMany({
    data: brands,
  })

  await prisma.category.createMany({
    data: categories,
  })

  await prisma.location.createMany({
    data: locations,
  })

  await prisma.person.createMany({
    data: consumersPeople,
  })
  await prisma.consumer.createMany({
    data: consumers,
  })

  await prisma.person.createMany({
    data: employeesPeople,
  })

  await prisma.employee.createMany({
    data: employees,
  })

  await prisma.module.createMany({
    data: modules,
  })

  await prisma.payMethod.createMany({
    data: payMethods,
  })

  await prisma.product.createMany({
    data: products,
  })

  await prisma.service.createMany({
    data: services,
  })

  await prisma.quota.createMany({
    data: quotas,
  })

  await prisma.permission.createMany({
    data: permissions,
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    Logger.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
