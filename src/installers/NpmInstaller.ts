import {IService, IServiceInstaller, Port, ResultCode} from '../types'

export class NpmInstaller implements IServiceInstaller {
  public installService(service: IService): Promise<Port> {
    return new Promise((resolve, reject) => {
      console.log(`installed service ${service.name}`)
      resolve('3000')
    })
  }

  public uninstallService(service: IService): Promise<ResultCode> {
    return Promise.resolve('200')
  }
}
