interface Permission {
  employeeId: number
  moduleId: number
}

export const permissions: Permission[] = [
  { employeeId: 1, moduleId: 1 },
  { employeeId: 1, moduleId: 2 },
  { employeeId: 1, moduleId: 3 },
  { employeeId: 2, moduleId: 4 },
  { employeeId: 2, moduleId: 5 },
  { employeeId: 2, moduleId: 6 },
  { employeeId: 3, moduleId: 7 },
  { employeeId: 3, moduleId: 8 },
  { employeeId: 3, moduleId: 9 },
  { employeeId: 4, moduleId: 10 },
  { employeeId: 4, moduleId: 1 },
  { employeeId: 4, moduleId: 2 },
  { employeeId: 5, moduleId: 3 },
  { employeeId: 5, moduleId: 4 },
  { employeeId: 5, moduleId: 5 },
  { employeeId: 6, moduleId: 6 },
  { employeeId: 6, moduleId: 7 },
  { employeeId: 6, moduleId: 8 },
  { employeeId: 7, moduleId: 9 },
  { employeeId: 7, moduleId: 10 },
  { employeeId: 7, moduleId: 1 },
]
