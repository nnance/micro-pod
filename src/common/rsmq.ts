import * as RedisSMQ from 'rsmq'

import {IService} from '../types'

export interface IServiceMessage {
  action: string
  service: IService
}

const rsmq = new RedisSMQ( {host: '127.0.0.1', port: 6379, ns: 'micro-pod'} )

export function createQueue(): Promise<number> {
  return new Promise((resolve, reject) => {
    rsmq.createQueue({qname: 'services'}, (err, resp) => {
      if (resp === 1) {
        resolve(resp)
      } else {
        reject(err)
      }
    })
  })
}

export function sendMessage(msg: IServiceMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    rsmq.sendMessage({qname: 'services', message: JSON.stringify(msg)}, (err, resp) => {
      if (resp) {
        resolve(resp)
      } else {
        reject(err)
      }
    })
  })
}
