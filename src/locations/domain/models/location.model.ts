export enum LocationType {
  COUNTRY = 'COUNTRY',
  STATE = 'STATE',
  CITY = 'CITY',
  NEIGHBORHOOD = 'NEIGHBORHOOD',
}

export interface ILocationModel {
  id: number
  name: string
  type: LocationType
  parent: ILocationModel | null
}
