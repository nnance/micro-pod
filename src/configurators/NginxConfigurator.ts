import {IConfiguration, IRouterConfigurator} from '../types'

export class NginxConfigurator implements IRouterConfigurator {
  public installRoutes(config: IConfiguration): Promise<void> {
    return Promise.resolve()
  }
}
