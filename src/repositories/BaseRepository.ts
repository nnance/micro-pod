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

export abstract class BaseRepository implements IServiceRepository {

  protected handlers = {}

  public abstract load(): Promise<IConfiguration>

  public onServiceAdded(handler: ServiceAdded): Handler[] {
    return this.addEventHandler(HandlerType.ServiceAdded, handler)
  }

  public onConfigChanged(handler: ConfigChanged): Handler[] {
    return this.addEventHandler(HandlerType.ConfigChanged, handler)
  }

  public onServiceRemoved(handler: ServiceRemoved): Handler[] {
    return this.addEventHandler(HandlerType.ServiceRemoved, handler)
  }

  protected addEventHandler(type: HandlerType, handler: Handler) {
    if (this.handlers[type]) {
      this.handlers[type].push(handler)
    } else {
      this.handlers[type] = [handler]
    }
    return this.handlers[type]
  }

  protected triggerEvent(type: HandlerType) {
    this.handlers[type].forEach((handler) => handler())
  }
}
