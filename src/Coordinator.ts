import {
  IConfiguration,
  IRouterConfigurator,
  IRuntimeContext,
  IService,
  IServiceInstaller,
  IServiceRepository,
  Port,
} from './types'

export class Coordinator {
  private configurator: IRouterConfigurator
  private installer: IServiceInstaller
  private repository: IServiceRepository

  constructor(context: IRuntimeContext) {
    this.configurator = context.configurator
    this.installer = context.installer
    this.repository = context.repository

    this.repository.onServiceAdded(this.addService)
  }

  public async start() {
    const config = await this.repository.load()
    return this.installServices(config)
  }

  private addService(service: IService) {
    return this.installer.installService(service)
  }

  private installServices(config: IConfiguration): Promise<Port[]> {
    return Promise.all(config.services.map((service) => this.addService(service)))
  }
}
