const express = require('express')
const app = express()
const mongoose = require('mongoose')
const routes = require('./routes/index')
const bodyParser = require('body-parser')
const compression = require('compression')
const config = require('./config')

app.use(compression())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/', routes)

mongoose.connect(config.DatabaseURL, (err => {
  if(err){
    console.log(err)
    throw err
  }
}))

app.get('/', (req, res) => {
  res.send('This shit is working')
})

if(!module.parent){
  app.listen(config.port, () => {
    console.log('Listening on port ' + config.port)
  })
}

module.exports = app
