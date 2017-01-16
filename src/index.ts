import {
  IConfiguration,
  IRouterConfigurator,
  IRuntimeContext,
  IService,
  IServiceInstaller,
  IServiceRepository,
  Port,
} from './types'

import {MemoryRepository} from './repositories/MemoryRepository'

import {NpmInstaller} from './installers/NpmInstaller'

import {NginxConfigurator} from './configurators/NginxConfigurator'

class Orchestrator {
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
    this.installServices(config)
  }

  private addService(service: IService) {
    return this.installer.installService(service)
  }

  private installServices(config: IConfiguration): Promise<Port[]> {
    return Promise.all(config.services.map(this.addService.bind(this)))
  }
}

const podOrchestrator = new Orchestrator({
  configurator: new NginxConfigurator(),
  installer: new NpmInstaller(),
  repository: new MemoryRepository(),
})

podOrchestrator.start()
