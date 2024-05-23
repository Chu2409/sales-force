export class ServiceModel {
  constructor(
    private id: number,
    private name: string,
    private description: string,
    private pricePerHour: number,
    private isAvaliable: boolean,
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

  public getDescription(): string {
    return this.description
  }

  public setDescription(description: string): void {
    this.description = description
  }

  public getPricePerHour(): number {
    return this.pricePerHour
  }

  public setPricePerHour(pricePerHour: number): void {
    this.pricePerHour = pricePerHour
  }

  public getIsAvaliable(): boolean {
    return this.isAvaliable
  }

  public setIsAvaliable(isAvaliable: boolean): void {
    this.isAvaliable = isAvaliable
  }
}
