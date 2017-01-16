import * as getPort from 'get-port'
import {IService, IServiceInstaller, Port, ResultCode} from '../types'

export class NpmInstaller implements IServiceInstaller {
  public installService(service: IService): Promise<Port> {
    return new Promise(async (resolve, reject) => {
      const port = await getPort()
      console.log(`installed service ${service.name} at ${port}`)
    })
  }

  public uninstallService(service: IService): Promise<ResultCode> {
    return Promise.resolve('200')
  }
}
