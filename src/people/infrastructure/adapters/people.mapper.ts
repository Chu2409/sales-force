import { Location, Person } from '@prisma/client'
import { LocationsMapper } from 'src/locations/infrastructure/adapters/locations.mapper'
import { IPersonWithLocationRes } from 'src/people/domain/dtos/person-with-location.res'
import { IPersonRes } from 'src/people/domain/dtos/person.res'
import { PersonGender } from 'src/people/domain/models/person.interface'

export interface IPrismaPersonWithLocation extends Person {
  location: Location
}

export class PeopleMapper {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static toRes({ locationId, ...person }: Person): IPersonRes {
    return {
      ...person,
      gender: person.gender as PersonGender,
    }
  }

  static toResWithLocation(
    person: IPrismaPersonWithLocation,
  ): IPersonWithLocationRes {
    return {
      ...this.toRes(person),
      location: LocationsMapper.toRes(person.location),
    }
  }
}
