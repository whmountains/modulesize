const express = require('express')
const morgan = require('morgan')
const jsSize = require('js-size')
const got = require('got')

const app = express()

app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send('Go to ./PKGNAME to see how big it will be when minified and bundled in the browser.')
})

app.get('/:pkg', (req, res) => {
  got(`https://wzrd.in/bundle/${req.params.pkg}`)
  .then(dl => {
    console.log(dl.body)
    res.send(jsSize(dl.body))
  })
})

const listenPort = process.env.PORT || 3006
app.listen(listenPort, () => {
  console.log(`express listening on *:${listenPort}`)
})
