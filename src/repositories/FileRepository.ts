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

export class FileRepository extends BaseRepository {
  private filename: string
  private config: IConfiguration

  constructor(filename: string) {
    super()
    this.filename = filename
  }

  public async load(): Promise<IConfiguration> {
    console.log(`loading ${this.filename}`)
    const config = require(this.filename).default
    console.log('loaded')
    this.config = {
      services: config.services.map((service) => {
        return {
          env: service.env,
          module: service.module,
          name: service.name,
          path: service.path,
          routes: service.routes.map((route) => {
            return {
              path: route.path,
              rewrite: route.rewrite,
            }
          }),
        }
      }),
    }
    console.dir(this.config)
    return Promise.resolve(this.config)
  }
}
