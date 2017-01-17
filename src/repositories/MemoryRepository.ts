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
        module: 'graphql-server-micro',
        name: 'GraphQL',
        path: './node_modules/graphql-server-micro/dist/index.js',
        routes: [ { path: '/grpahql' } ],
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
}
