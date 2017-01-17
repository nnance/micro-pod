import * as micro from 'micro'
import * as RedisSMQ from 'rsmq'

const rsmq = new RedisSMQ( {host: '127.0.0.1', port: 6379, ns: 'micro-pod'} )
rsmq.createQueue({qname: 'services'}, (err, resp) => {
  if (resp === 1) {
    console.log('queue created')
  }
})

export default async (req, res) => {
  console.log('add route request')
  const data = await micro.json(req)
  const msg = {
    action: 'add',
    service: data,
  }
  rsmq.sendMessage({qname: 'services', message: JSON.stringify(msg)}, (err, resp) => {
    if (resp) {
      console.log('Message sent. ID:', resp)
    }
  })
  micro.send(res, 200)
}
