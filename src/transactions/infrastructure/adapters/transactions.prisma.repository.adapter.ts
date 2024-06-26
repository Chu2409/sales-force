import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { PRISMA_SERVICE } from 'src/prisma/prisma-provider.const'
import { ITransactionsRepositoryPort } from 'src/transactions/domain/ports/out/transactions.repository.port'
import { ICreateTransactionDto } from 'src/transactions/domain/dtos/create-transaction.dto'
import { ITransactionRes } from 'src/transactions/domain/dtos/transaction.res'
import { IUpdateTransactionDto } from 'src/transactions/domain/dtos/update-transaction.dto'
import { TransactionsMapper } from './transactions.mapper'
import { ITotalMonthlyRes } from 'src/transactions/domain/dtos/total-monthly.res'
import { getMonthsBase } from 'src/shared/domain/consts/get-months-base'
import { ITotalByEmployeeRes } from 'src/transactions/domain/dtos/total-by-employee.res'

@Injectable()
export class TransactionsPrismaRepositoryAdapter
  implements ITransactionsRepositoryPort
{
  constructor(
    @Inject(PRISMA_SERVICE) private readonly prismaService: PrismaService,
  ) {}

  async createTransaction(
    createTransactionDto: ICreateTransactionDto,
  ): Promise<ITransactionRes> {
    const transaction = await this.prismaService.transaction.create({
      data: {
        ...createTransactionDto,
        items: {
          createMany: {
            data: createTransactionDto.items,
          },
        },
      },
      include: {
        delegation: {
          include: {
            consumer: {
              include: {
                person: { include: { location: true } },
              },
            },
            employee: {
              include: {
                person: { include: { location: true } },
              },
            },
          },
        },
        items: {
          include: {
            product: {
              include: {
                brand: true,
                category: true,
              },
            },
            service: true,
          },
        },
        task: {
          include: {
            delegation: {
              include: {
                consumer: {
                  include: { person: { include: { location: true } } },
                },
                employee: {
                  include: { person: { include: { location: true } } },
                },
              },
            },
            comments: true,
          },
        },
        payMethod: true,
      },
    })

    return transaction ? TransactionsMapper.toRes(transaction) : null
  }

  async updateTransaction(
    id: number,
    updateTransactionDto: IUpdateTransactionDto,
  ): Promise<ITransactionRes> {
    let transactionToUpdate

    if (updateTransactionDto.items) {
      await this.prismaService.item.deleteMany({
        where: { transactionId: id },
      })

      await this.prismaService.item.createMany({
        data: updateTransactionDto.items.map((item) => ({
          ...item,
          quantity: item.quantity,
          transactionId: id,
        })),
      })

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { items, ...restTransaction } = updateTransactionDto

      transactionToUpdate = restTransaction
    }

    const transaction = await this.prismaService.transaction.update({
      where: { id },
      data: transactionToUpdate || updateTransactionDto,
      include: {
        delegation: {
          include: {
            consumer: {
              include: {
                person: { include: { location: true } },
              },
            },
            employee: {
              include: {
                person: { include: { location: true } },
              },
            },
          },
        },
        items: {
          include: {
            product: {
              include: {
                brand: true,
                category: true,
              },
            },
            service: true,
          },
        },
        task: {
          include: {
            delegation: {
              include: {
                consumer: {
                  include: { person: { include: { location: true } } },
                },
                employee: {
                  include: { person: { include: { location: true } } },
                },
              },
            },
            comments: true,
          },
        },
        payMethod: true,
      },
    })

    return transaction ? TransactionsMapper.toRes(transaction) : null
  }

  async setTotal(id: number, total: number): Promise<ITransactionRes> {
    const transaction = await this.prismaService.transaction.update({
      where: { id },
      data: { total },
      include: {
        delegation: {
          include: {
            consumer: {
              include: {
                person: { include: { location: true } },
              },
            },
            employee: {
              include: {
                person: { include: { location: true } },
              },
            },
          },
        },
        items: {
          include: {
            product: {
              include: {
                brand: true,
                category: true,
              },
            },
            service: true,
          },
        },
        task: {
          include: {
            delegation: {
              include: {
                consumer: {
                  include: { person: { include: { location: true } } },
                },
                employee: {
                  include: { person: { include: { location: true } } },
                },
              },
            },
            comments: true,
          },
        },
        payMethod: true,
      },
    })

    return transaction ? TransactionsMapper.toRes(transaction) : null
  }

  async deleteTransaction(id: number): Promise<boolean> {
    const transaction = await this.prismaService.transaction.delete({
      where: { id },
    })

    return !!transaction
  }

  async getTransactionById(id: number): Promise<ITransactionRes> {
    const transaction = await this.prismaService.transaction.findUnique({
      where: { id },
      include: {
        delegation: {
          include: {
            consumer: {
              include: {
                person: { include: { location: true } },
              },
            },
            employee: {
              include: {
                person: { include: { location: true } },
              },
            },
          },
        },
        items: {
          include: {
            product: {
              include: {
                brand: true,
                category: true,
              },
            },
            service: true,
          },
        },
        task: {
          include: {
            delegation: {
              include: {
                consumer: {
                  include: { person: { include: { location: true } } },
                },
                employee: {
                  include: { person: { include: { location: true } } },
                },
              },
            },
            comments: true,
          },
        },
        payMethod: true,
      },
    })

    return transaction ? TransactionsMapper.toRes(transaction) : null
  }

  async getTransactions(): Promise<ITransactionRes[]> {
    const transactions = await this.prismaService.transaction.findMany({
      include: {
        delegation: {
          include: {
            consumer: {
              include: {
                person: { include: { location: true } },
              },
            },
            employee: {
              include: {
                person: { include: { location: true } },
              },
            },
          },
        },
        items: {
          include: {
            product: {
              include: {
                brand: true,
                category: true,
              },
            },
            service: true,
          },
        },
        task: {
          include: {
            delegation: {
              include: {
                consumer: {
                  include: { person: { include: { location: true } } },
                },
                employee: {
                  include: { person: { include: { location: true } } },
                },
              },
            },
            comments: true,
          },
        },
        payMethod: true,
      },
      orderBy: { id: 'desc' },
    })

    return transactions.map((transaction) =>
      TransactionsMapper.toRes(transaction),
    )
  }

  async getTotalMonthlyByYear(year: number): Promise<ITotalMonthlyRes> {
    const data: any = await this.prismaService.$queryRaw`
      SELECT
        EXTRACT(MONTH FROM date) as month,
        SUM(total) as total
      FROM
        "transactions"
      WHERE
        EXTRACT(YEAR FROM date) = ${year} AND status = 'PAID'
      GROUP BY
        EXTRACT(MONTH FROM date)
      ORDER BY
        month ASC
    `

    const monthsWithTotal = getMonthsBase()

    data.forEach((item) => {
      monthsWithTotal[item.month] = item.total
    })

    return monthsWithTotal
  }

  async getTotalByEmployeeId(
    employeeId: number,
  ): Promise<ITotalByEmployeeRes[]> {
    const data: any = await this.prismaService.$queryRaw`
      SELECT
        t.type as type,
        SUM(t.total) as total
      FROM
        "transactions" t
      JOIN
        "delegations" d ON d.id = t.delegation_id
      JOIN
        "employees" e ON e.id = d.employee_id
      WHERE
        e.id = ${employeeId} AND t.status = 'PAID'
      GROUP BY
        t.type
    `

    return data
  }
}
