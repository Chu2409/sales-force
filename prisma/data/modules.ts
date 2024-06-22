interface Module {
  name: string
  description?: string
  isActive?: boolean
}

export const modules: Module[] = [
  {
    name: 'COMMON',
    description: 'Module for common operations',
    isActive: true,
  },
  {
    name: 'ADMNISTRATOR',
    description: 'Module for managing user accounts and profiles',
    isActive: true,
  },
  {
    name: 'SUPERVISOR',
    description: 'Module for managing user roles and permissions',
    isActive: true,
  },
  {
    name: 'SALES',
    description: 'Module for managing sales and customers',
    isActive: true,
  },
]
