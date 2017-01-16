import {
  ConfigChanged,
  Handler,
  HandlerType,
  IConfiguration,
  IRoute,
  IService,
  IServiceRepository,
  ServiceAdded,
  ServiceRemoved,
} from '../types'

import {EventEmitter} from 'events'
import {BaseRepository} from './BaseRepository'

export class MemoryRepository extends BaseRepository {

  private config: IConfiguration = {
    services: [
      {
        name: 'Foo',
        path: '/foo/',
        routes: [ { path: '/' } ],
      },
    ],
  }

  constructor(repo?: EventEmitter) {
    super()
    if (repo) {
      repo.on('added', () => this.triggerEvent(HandlerType.ServiceAdded))
    }
  }

  public load(): Promise<IConfiguration> {
    return Promise.resolve(this.config)
  }

  public onServiceAdded(handler: ServiceAdded): Handler[] {
    return this.addEventHandler(HandlerType.ServiceAdded, handler)
  }

  public onConfigChanged(handler: ConfigChanged): Handler[] {
    return this.addEventHandler(HandlerType.ConfigChanged, handler)
  }

  public onServiceRemoved(handler: ServiceRemoved): Handler[] {
    return this.addEventHandler(HandlerType.ServiceRemoved, handler)
  }
}
