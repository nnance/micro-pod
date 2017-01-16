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

export class MemoryRepository implements IServiceRepository {

  private handlers = {}
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

  private addEventHandler(type: HandlerType, handler: Handler) {
    if (this.handlers[type]) {
      this.handlers[type].push(handler)
    } else {
      this.handlers[type] = [handler]
    }
    return this.handlers[type]
  }

  private triggerEvent(type: HandlerType) {
    this.handlers[type].forEach((handler) => handler())
  }
}
