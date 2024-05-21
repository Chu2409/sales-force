export enum EmployeeRoleModel {
  SELLER = 'SELLER',
  SUPERVISOR = 'SUPERVISOR',
  ADMIN = 'ADMIN',
}

export class EmployeeModel {
  constructor(
    private id: number,
    private username: string,
    private password: string,
    private role: EmployeeRoleModel,
    private isActive: boolean,
    private personId: number,
  ) {}

  public getId(): number {
    return this.id
  }

  public setId(id: number): void {
    this.id = id
  }

  public getUsername(): string {
    return this.username
  }

  public setUsername(username: string): void {
    this.username = username
  }

  public getPassword(): string {
    return this.password
  }

  public setPassword(password: string): void {
    this.password = password
  }

  public getRole(): EmployeeRoleModel {
    return this.role
  }

  public setRole(role: EmployeeRoleModel): void {
    this.role = role
  }

  public getIsActive(): boolean {
    return this.isActive
  }

  public setIsActive(isActive: boolean): void {
    this.isActive = isActive
  }

  public getPersonId(): number {
    return this.personId
  }

  public setPersonId(personId: number): void {
    this.personId = personId
  }
}
