import * as micro from 'micro'
import {resolve} from 'path'

import {Port} from './types'

import {Coordinator} from './Coordinator'

export class Server {
  private port: Port
  private podCoordinator: Coordinator
  private server: micro

  constructor(port: Port, coordinator: Coordinator) {
    this.port = port
    this.podCoordinator = coordinator

    this.server = micro(async (req, res) => {
      console.log('got request')
      const data = await micro.json(req)
      micro.send(res, 200)
    })
  }

  public listen() {
    this.podCoordinator
      .start()
      .then(() => this.startServer())
  }

  private startServer() {
    this.server.listen(this.port, (err) => {
      if (err) {
        console.error(err.stack)
        process.exit(1)
      }

      console.log(`> \u001b[96mReady!\u001b[39m Server listening on ${this.port}.`)
    })
  }
}
