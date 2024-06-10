interface Category {
  name: string
  isActive?: boolean
}

export const categories: Category[] = [
  { name: 'Electronics', isActive: true },
  { name: 'Home Appliances', isActive: true },
  { name: 'Computers', isActive: true },
  { name: 'Mobile Phones', isActive: true },
  { name: 'Accessories', isActive: true },
]
