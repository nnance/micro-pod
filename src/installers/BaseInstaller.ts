import {spawn} from 'child_process'
import * as getPort from 'get-port'
import {dirname, resolve} from 'path'

import {IService, IServiceInstaller, Port, ResultCode} from '../types'

export abstract class BaseInstaller implements IServiceInstaller {
  public abstract installService(service: IService): Promise<Port>
  public abstract uninstallService(service: IService): Promise<ResultCode>

  protected spawn(command: string, args: string[]): Promise<any> {
    return new Promise((resolve, reject) => {
      const npm = spawn(command, args)

      npm.stderr.on('data', (data) => {
        console.log(`${command} stderr: ${data}`)
      })

      npm.on('close', (code) => {
        if (code !== 0) {
          console.log(`${command} process exited with code ${code}`)
          reject(code)
        } else {
          resolve(code)
        }
      })

      npm.on('error', (err) => {
        console.log(`Failed to start ${command} process.`)
        reject(err)
      })
    })
  }

  protected async spawnService(service: IService) {
    const id = service.name
    const path = resolve(dirname('.'), service.path)
    const env = service.env ? Object.assign({}, process.env, service.env) : process.env
    const port = service.port || await getPort()

    const opts = {env, stdio: 'inherit', customFds: [0, 1, 2]}
    const microCli = resolve('node_modules', 'micro', 'bin', 'micro')
    console.log(`spawn ${microCli} service ${id} port ${port} path ${path}`)
    await spawn(microCli, ['--port', port.toString(), path], opts)
    return port.toString()
  }

}
