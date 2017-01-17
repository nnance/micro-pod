const path = require('path');
const program = require('commander')
const pk = require('../package')
const Server = require('../dist/index').Server
const Coordinator = require('../dist/Coordinator').Coordinator
const NginxConfigurator = require('../dist/configurators/NginxConfigurator').NginxConfigurator
const NpmInstaller = require('../dist/installers/NpmInstaller').NpmInstaller
const FileRepository = require('../dist/repositories/FileRepository').FileRepository
const MemoryRepository = require('../dist/repositories/MemoryRepository').MemoryRepository

program
  .version(pk.version)
  .option('-p, --port <port>', 'Port to listen on (3000)', parseInt)
  .parse(process.argv)

const programPort = program.port || 3000
const file = program.args[0] ? path.resolve(process.cwd(), program.args[0]) : undefined

const podCoordinator = new Coordinator({
  configurator: new NginxConfigurator(),
  installer: new NpmInstaller(),
  repository: file ? new FileRepository(file) : new MemoryRepository(),
})

const server = new Server(programPort, podCoordinator)
server.listen()
