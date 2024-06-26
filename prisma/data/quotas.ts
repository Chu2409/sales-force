interface Quota {
  startDate: Date
  endDate: Date
  goal: number
  commission: number
  isAchieved?: boolean
  isActive?: boolean
  employeeId: number
}
export const quotas: Quota[] = [
  {
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-01-31'),
    goal: 100000,
    commission: 0.05,
    isAchieved: true,
    isActive: true,
    employeeId: 1,
  },
  {
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-02-29'),
    goal: 120000,
    commission: 0.05,
    isAchieved: false,
    isActive: true,
    employeeId: 2,
  },
  {
    startDate: new Date('2024-03-01'),
    endDate: new Date('2024-03-31'),
    goal: 150000,
    commission: 0.05,
    isAchieved: true,
    isActive: true,
    employeeId: 3,
  },
  {
    startDate: new Date('2024-04-01'),
    endDate: new Date('2024-04-30'),
    goal: 130000,
    commission: 0.05,
    isAchieved: true,
    isActive: true,
    employeeId: 4,
  },
  {
    startDate: new Date('2024-05-01'),
    endDate: new Date('2024-05-31'),
    goal: 110000,
    commission: 0.05,
    isAchieved: false,
    isActive: true,
    employeeId: 5,
  },
  {
    startDate: new Date('2024-06-01'),
    endDate: new Date('2024-06-30'),
    goal: 140000,
    commission: 0.05,
    isAchieved: false,
    isActive: true,
    employeeId: 6,
  },
  {
    startDate: new Date('2024-07-01'),
    endDate: new Date('2024-07-31'),
    goal: 170000,
    commission: 0.05,
    isAchieved: false,
    isActive: true,
    employeeId: 7,
  },
  {
    startDate: new Date('2024-08-01'),
    endDate: new Date('2024-08-31'),
    goal: 125000,
    commission: 0.05,
    isAchieved: false,
    isActive: true,
    employeeId: 8,
  },
  {
    startDate: new Date('2024-09-01'),
    endDate: new Date('2024-09-30'),
    goal: 160000,
    commission: 0.05,
    isAchieved: false,
    isActive: true,
    employeeId: 9,
  },
  {
    startDate: new Date('2024-10-01'),
    endDate: new Date('2024-10-31'),
    goal: 180000,
    commission: 0.05,
    isAchieved: false,
    isActive: true,
    employeeId: 10,
  },
]
