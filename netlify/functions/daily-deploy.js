import fetch from 'node-fetch'
import { schedule } from '@netlify/functions'

const handler = schedule('@daily', async () => {
  await fetch(process.env.BUILD_WEBHOOK, {
    method: 'POST'
  }).then(response => {
    console.log('Build hook response:', response)
  })

  return {
    statusCode: 200
  }
})

export { handler }
