import {IService, IServiceInstaller, Port, ResultCode} from '../types'

import {BaseInstaller} from './BaseInstaller'

export class NpmInstaller extends BaseInstaller {

  public async installService(service: IService) {
    if (service.module) {
      await this.spawn('npm', ['link', service.module])
    }
    service.port = await this.spawnService(service)
    console.log(`installed service ${service.name} at ${service.port}`)
    return service.port
  }

  public uninstallService(service: IService): Promise<ResultCode> {
    return Promise.resolve('200')
  }
}
