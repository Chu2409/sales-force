interface Module {
  name: string
  description?: string
  isActive?: boolean
}

export const modules: Module[] = [
  {
    name: 'Authentication',
    description: 'Module for user authentication and authorization',
    isActive: true,
  },
  {
    name: 'User Management',
    description: 'Module for managing user accounts and profiles',
    isActive: true,
  },
  {
    name: 'Product Catalog',
    description: 'Module for managing products and their details',
    isActive: true,
  },
  {
    name: 'Order Management',
    description: 'Module for handling customer orders and transactions',
    isActive: true,
  },
  {
    name: 'Inventory Management',
    description: 'Module for tracking and managing inventory levels',
    isActive: true,
  },
  {
    name: 'Reporting',
    description: 'Module for generating reports and analytics',
    isActive: true,
  },
  {
    name: 'Customer Relationship Management (CRM)',
    description: 'Module for managing customer interactions and relationships',
    isActive: true,
  },
  {
    name: 'Billing and Invoicing',
    description: 'Module for managing billing and generating invoices',
    isActive: true,
  },
  {
    name: 'Shipping and Logistics',
    description: 'Module for handling shipping and logistics operations',
    isActive: true,
  },
  {
    name: 'Content Management System (CMS)',
    description: 'Module for managing website content and pages',
    isActive: true,
  },
]
