import { ITotalMonthlyRes } from 'src/transactions/domain/dtos/total-monthly.res'

export const getMonthsBase = (): ITotalMonthlyRes => {
  const totalByYear: ITotalMonthlyRes = {}

  for (let i = 1; i <= 12; i++) {
    totalByYear[i] = 0
  }

  return totalByYear
}
