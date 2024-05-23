export enum LocationTypeModel {
  COUNTRY = 'COUNTRY',
  STATE = 'STATE',
  CITY = 'CITY',
  NEIGHBORHOOD = 'NEIGHBORHOOD',
}

export class LocationModel {
  constructor(
    private id: number,
    private name: string,
    private type: LocationTypeModel,
    private parentId: number | null,
  ) {}

  public getId(): number {
    return this.id
  }

  public setId(id: number): void {
    this.id = id
  }

  public getName(): string {
    return this.name
  }

  public setName(name: string): void {
    this.name = name
  }

  public getType(): LocationTypeModel {
    return this.type
  }

  public setType(type: LocationTypeModel): void {
    this.type = type
  }

  public getParentId(): number | null {
    return this.parentId
  }

  public setParentId(parentId: number | null): void {
    this.parentId = parentId
  }
}
