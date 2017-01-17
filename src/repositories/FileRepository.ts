import {EventEmitter} from 'events'
import {IConfiguration} from '../types'
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
