import { ApiProperty } from '@nestjs/swagger'
import { IModuleRes } from 'src/modules/domain/dtos/module.res'

export class ModuleRes implements IModuleRes {
  @ApiProperty()
  id: number

  @ApiProperty()
  name: string

  @ApiProperty({ nullable: true })
  description: string | null

  @ApiProperty()
  isActive: boolean
}
