export type Port = string
export type ResultCode = string

export type ConfigChanged = (IConfiguration) => void
export type ServiceAdded = (IService) => void
export type ServiceRemoved = (IService) => void

export type Handler = ServiceAdded | ConfigChanged | ServiceRemoved
export enum HandlerType {ServiceAdded, ConfigChanged, ServiceRemoved}

export interface INodeEnv {
  readonly variable: string
  readonly value: string
}

export interface IRoute {
  readonly path: string
  readonly rewrite?: string[]
}

export interface IService {
  readonly name: string
  readonly path: string
  readonly env?: INodeEnv[]
  readonly routes: IRoute[]
  port?: Port
}

export interface IConfiguration {
  services: IService[]
}

export interface IServiceRepository {
  load(): Promise<IConfiguration>
  onConfigChanged(handler: ConfigChanged): Handler[]
  onServiceAdded(handler: ServiceAdded): Handler[]
  onServiceRemoved(handler: ServiceRemoved): Handler[]
}

export interface IServiceInstaller {
  installService(service: IService): Promise<Port>
  uninstallService(service: IService): Promise<ResultCode>
}

export interface IRouterConfigurator {
  installRoutes(config: IConfiguration): Promise<void>
}

export interface IRuntimeContext {
  readonly repository: IServiceRepository
  readonly installer: IServiceInstaller
  readonly configurator: IRouterConfigurator
}
