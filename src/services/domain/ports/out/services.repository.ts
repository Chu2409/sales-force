import { ICreateServiceDto } from '../../dtos/create-service.dto'
import { IServiceRes } from '../../dtos/service.res'
import { IUpdateServiceDto } from '../../dtos/update-service.dto'

export interface IServicesRepositoryPort {
  createService(service: ICreateServiceDto): Promise<IServiceRes>
  updateService(id: number, service: IUpdateServiceDto): Promise<IServiceRes>
  setServiceActive(id: number, state: boolean): Promise<boolean>
  getServices(): Promise<IServiceRes[]>
  getServiceById(id: number): Promise<IServiceRes>
}
