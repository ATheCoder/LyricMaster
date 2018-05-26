const index = require('express').Router()
const addSong = require('./addSong')
const showAllSongs = require('./showAllSongs')
const getLyrics = require('./getLyrics')

index.use('/', addSong)
index.use('/', showAllSongs)
index.use('/', getLyrics)

module.exports = index
