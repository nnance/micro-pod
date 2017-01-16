import {expect} from 'code'
import * as Lab from 'lab'
export const lab = Lab.script()

const describe = lab.describe
const it = lab.it
const before = lab.before

import {EventEmitter} from 'events'
import {MemoryRepository} from '../../repositories/MemoryRepository'

describe('Memory Repository', () => {
  describe('when adding handlers', () => {
    const repo = new MemoryRepository()

    it('expect handler count to be 1 after initial add', (done) => {
      let handlers = repo.onServiceAdded((service) => {return service.name})
      expect(handlers).to.exist()
      expect(handlers.length).to.equal(1)
      done()
    })

    it('expect handler count to be 2 after second add', (done) => {
      let handlers = repo.onServiceAdded((service) => {return service.name})
      expect(handlers).to.exist()
      expect(handlers.length).to.equal(2)
      done()
    })
  })

  describe('when new service is added', () => {
    const mock = new EventEmitter()
    const repo = new MemoryRepository(mock)

    let handlerCount = 0
    repo.onServiceAdded(() => {return ++handlerCount})

    it('expect the handler to be called once', (done) => {
      mock.emit('added')
      expect(handlerCount).to.equal(1)
      done()
    })
  })
})
