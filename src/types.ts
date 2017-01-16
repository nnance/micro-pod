export type Port = String
export type ResultCode = String

export type IConfigChanged = (IConfiguration) => void
export type IServiceAdded = (IService) => void
export type IServiceRemoved = (IService) => void

export interface INodeEnv {
  readonly variable: String
  readonly value: String
}

export interface IRoute {
  readonly path: String
  readonly rewrite?: String[]
}

export interface IService {
  readonly name: String
  readonly path: String
  readonly env?: INodeEnv[]
  readonly routes: IRoute[]
  port?: Port
}

export interface IConfiguration {
  services: IService[]
}

export interface IServiceRepository {
  load(): Promise<IConfiguration>
  onConfigChanged(handler: IConfigChanged)
  onServiceAdded(handler: IServiceAdded)
  onServiceRemoved(handler: IServiceRemoved)
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
