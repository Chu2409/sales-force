export enum ConsumerTypeModel {
  NATURAL = 'NATURAL',
  COMPANY = 'COMPANY',
}

export class ConsumerModel {
  constructor(
    private id: number,
    private type: ConsumerTypeModel,
    private isCustomer: boolean,
    private personId: number,
  ) {}

  public getId(): number {
    return this.id
  }

  public setId(id: number): void {
    this.id = id
  }

  public getType(): ConsumerTypeModel {
    return this.type
  }

  public setType(type: ConsumerTypeModel): void {
    this.type = type
  }

  public getIsCustomer(): boolean {
    return this.isCustomer
  }

  public setIsCustomer(isCustomer: boolean): void {
    this.isCustomer = isCustomer
  }

  public getPersonId(): number {
    return this.personId
  }

  public setPersonId(personId: number): void {
    this.personId = personId
  }
}
