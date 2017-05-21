import * as micro from 'micro'
import {createQueue, sendMessage} from '../common/rsmq'

createQueue()
  .then(() => console.log('queue created'))

export default async (req, res) => {
  console.log('add route request')
  const data = await micro.json(req)
  const msg = {
    action: 'add',
    service: data,
  }

  sendMessage(msg)
    .then((resp) => {
      console.log('Message sent. ID:', resp)
      micro.send(res, 200)
    })
}
