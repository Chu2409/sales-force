import { ApiProperty } from '@nestjs/swagger'
import { LocationRes } from 'src/locations/infrastructure/http-server/models/location.res'
import { IPersonWithLocationRes } from 'src/people/domain/dtos/person-with-location.res'
import { PersonGender } from 'src/people/domain/models/person.interface'

export class PersonWithLocationRes implements IPersonWithLocationRes {
  @ApiProperty()
  id: number

  @ApiProperty()
  dni: string

  @ApiProperty()
  name: string

  @ApiProperty({ nullable: true })
  secondName: string | null

  @ApiProperty()
  lastName: string

  @ApiProperty({ nullable: true })
  secondLastName: string | null

  @ApiProperty({ enum: PersonGender, nullable: true })
  gender: PersonGender | null

  @ApiProperty({ nullable: true })
  email: string | null

  @ApiProperty({ nullable: true })
  phone: string | null

  @ApiProperty({ type: Date, nullable: true })
  birthdate: Date | null

  @ApiProperty({ type: LocationRes })
  location: LocationRes
}
