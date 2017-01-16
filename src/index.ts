import {
  IConfiguration,
  IRouterConfigurator,
  IRuntimeContext,
  IService,
  IServiceInstaller,
  IServiceRepository,
  Port,
} from './types'

import * as micro from 'micro'

import {NginxConfigurator} from './configurators/NginxConfigurator'
import {NpmInstaller} from './installers/NpmInstaller'
import {MemoryRepository} from './repositories/MemoryRepository'

const program = require('commander')
const pk = require('../package')

program
.version(pk.version)
.option('-p, --port <port>', 'Port to listen on (3000)', parseInt)
.parse(process.argv)

const programPort = program.port || 3000

class Coordinator {
  private configurator: IRouterConfigurator
  private installer: IServiceInstaller
  private repository: IServiceRepository

  constructor(context: IRuntimeContext) {
    this.configurator = context.configurator
    this.installer = context.installer
    this.repository = context.repository

    this.repository.onServiceAdded(this.addService)
  }

  public async start() {
    const config = await this.repository.load()
    return this.installServices(config)
  }

  private addService(service: IService) {
    return this.installer.installService(service)
  }

  private installServices(config: IConfiguration): Promise<Port[]> {
    return Promise.all(config.services.map((service) => this.addService(service)))
  }
}

const podCoordinator = new Coordinator({
  configurator: new NginxConfigurator(),
  installer: new NpmInstaller(),
  repository: new MemoryRepository(),
})

const server = micro(async (req, res) => {
  console.log('got request')
  const data = await micro.json(req)
  micro.send(res, 200)
})

function startServer() {
  server.listen(3000, (err) => {
    if (err) {
      console.error(err.stack)
      process.exit(1)
    }

    console.log(`> \u001b[96mReady!\u001b[39m Listening on ${programPort}.`)
  })
}

podCoordinator
  .start()
  .then(startServer)
