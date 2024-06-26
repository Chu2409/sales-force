interface PayMethod {
  name: string
  tax: number
  isActive?: boolean
}

export const payMethods: PayMethod[] = [
  { name: 'Credit Card', tax: 0.03, isActive: true },
  { name: 'PayPal', tax: 0.02, isActive: true },
  { name: 'Bank Transfer', tax: 0.01, isActive: true },
  { name: 'Cash on Delivery', tax: 0.05, isActive: true },
  { name: 'Stripe', tax: 0.025, isActive: true },
]
