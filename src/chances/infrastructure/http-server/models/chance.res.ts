import { ApiProperty } from '@nestjs/swagger'
import { IChanceRes } from 'src/chances/domain/dtos/chance.res'
import { ChanceStatus } from 'src/chances/domain/models/chance.interface'
import { FullDelegationRes } from 'src/delegations/infrastructure/http-server/models/full-delegation.res'

export class ChanceRes implements IChanceRes {
  @ApiProperty()
  id: number

  @ApiProperty()
  amount: number

  @ApiProperty({ enum: ChanceStatus, nullable: true })
  status: ChanceStatus | null

  @ApiProperty()
  date: Date

  @ApiProperty()
  delegation: FullDelegationRes
}
