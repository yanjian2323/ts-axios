const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')

const app = express()
const compiler = webpack(WebpackConfig)

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

app.use(bodyParser.json())
// app.use(bodyParser.text())
app.use(bodyParser.urlencoded({ extended: true }))

const router = express.Router()

router.get('/test/get', (req, res) => {
  res.json({
    message: 'sucess'
  })
})

router.get('/base/get', (req, res) => {
  res.json(req.query)
})

router.post('/base/post', (req, res) => {
  res.json(req.body)
})

router.post('/base/buffer', (req, res) => {
  const ret = []
  req.on('data', (chunk) => {
    if(chunk)
      ret.push(chunk)
  })
  req.on('end', () => {
    res.json(Buffer.concat(ret).toJSON())
  })
})

router.get('/error/get', (req, res) => {
  if (Math.random() > 0.5) {
    res.status(500)
    res.end()
  } else {
    res.json({
      msg: 'success'
    })
  }
})

router.get('/error/timeout', (req, res) => {
  setTimeout(() => {
    res.json({
      msg: 'success'
    })
  }, 3000)
})

router.get('/extend/get', (req, res) => {
  res.json({
    msg: 'get'
  })
})

router.options('/extend/options', (req, res) => {
  res.json({
    msg: 'options'
  })
})

router.delete('/extend/delete', (req, res) => {
  res.json({
    msg: 'delete'
  })
})

router.head('/extend/head', (req, res) => {
  res.json({
    msg: 'head'
  })
})

router.post('/extend/post', (req, res) => {
  res.json(req.body)
})

router.put('/extend/put', (req, res) => {
 res.json(req.body) 
})

router.patch('/extend/patch', (req, res) => {
 res.json(req.body) 
})
app.use(router)

const port = process.env.PORT || 8080
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})