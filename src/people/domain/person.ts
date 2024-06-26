import { ILocation } from 'src/locations/domain/models/location.interface'
import { IPerson, PersonGender } from './models/person.interface'

export class Person implements IPerson {
  id: number
  dni: string
  name: string
  secondName: string | null
  lastName: string
  secondLastName: string | null
  gender: PersonGender | null
  email: string | null
  phone: string | null
  birthdate: Date | null
  location: ILocation

  private constructor() {}

  static builder() {
    return new PersonBuilder(new Person())
  }
}

class PersonBuilder {
  constructor(private person: IPerson) {}

  id(id: number) {
    this.person.id = id
    return this
  }

  dni(dni: string) {
    this.person.dni = dni
    return this
  }

  name(name: string) {
    this.person.name = name
    return this
  }

  secondName(secondName: string) {
    this.person.secondName = secondName
    return this
  }

  lastName(lastName: string) {
    this.person.lastName = lastName
    return this
  }

  secondLastName(secondLastName: string) {
    this.person.secondLastName = secondLastName
    return this
  }

  gender(gender: PersonGender) {
    this.person.gender = gender
  }

  email(email: string) {
    this.person.email = email
    return this
  }

  phone(phone: string) {
    this.person.phone = phone
    return this
  }

  birthdate(birthdate: Date) {
    this.person.birthdate = birthdate
    return this
  }

  location(location: ILocation) {
    this.person.location = location
    return this
  }

  build() {
    return this.person
  }
}
