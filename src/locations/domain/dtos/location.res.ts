import { ILocation } from '../models/location.interface'

export interface ILocationRes extends Omit<ILocation, 'parent'> {}
