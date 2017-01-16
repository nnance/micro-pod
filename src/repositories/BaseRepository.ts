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
  public abstract onServiceAdded(handler: ServiceAdded): Handler[]
  public abstract onConfigChanged(handler: ConfigChanged): Handler[]
  public abstract onServiceRemoved(handler: ServiceRemoved): Handler[]

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
