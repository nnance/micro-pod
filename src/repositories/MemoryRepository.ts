import {
  IConfigChanged,
  IConfiguration,
  IRoute,
  IService,
  IServiceAdded,
  IServiceRemoved,
  IServiceRepository,
} from '../types'

export class MemoryRepository implements IServiceRepository {
  public load(): Promise<IConfiguration> {
    return Promise.resolve({
      services: [
        {
          name: 'Foo',
          path: '/foo/',
          routes: [
            {
              path: '/',
            },
          ],
        },
      ],
    })
  }

  public onServiceAdded(handler: IServiceAdded) {
    console.log(`service handler add`)
  }

  public onConfigChanged(handler: IConfigChanged) {
    console.log(`servie handler changed`)
  }

  public onServiceRemoved(handler: IServiceRemoved) {
    console.log('service handler removed')
  }
}
