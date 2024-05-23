import { ServiceModel } from '../../models/service'

export interface IServicesServicePort {
  createService(service: ServiceModel): Promise<ServiceModel>
  updateService(id: number, service: ServiceModel): Promise<ServiceModel>
  deleteService(id: number): Promise<boolean>
  getServices(): Promise<ServiceModel[]>
  getServiceById(id: number): Promise<ServiceModel>
}
