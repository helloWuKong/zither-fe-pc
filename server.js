const express = require('express')
const next = require('next')

const devProxy = {
  '/api': {
    target: 'http://api.520guzheng.com',
    changeOrigin: true,
  },
}

const PORT = parseInt(process.env.PORT, 10) || 3000
const env = process.env.NODE_ENV
const dev = env !== 'production'

const app = next({
  dir: '',
  dev,
})

const handle = app.getRequestHandler()

let server
app.prepare().then(() => {
  server = express()
  if (dev && devProxy) {
    const proxyMiddleware = require('http-proxy-middleware')
    Object.keys(devProxy).forEach((context) => {
      server.use(proxyMiddleware(context, devProxy[context]))
    })
  }
  server.all('*', (req, res) => handle(req, res))

  server.listen(PORT, (err) => {
    if (err) {
      throw err
    }
    console.log(`> Ready on port ${PORT} [${env}]`)
  })
}).catch((err) => {
  console.log('An error occurred, unable to start the server')
  console.log(err)
})
