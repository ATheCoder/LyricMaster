const showAllSongs = require('express').Router()
const SongModel = require('../models/songModel')

showAllSongs.get('/showAllSongs', (req, res) => {
  SongModel.find({}).exec((err, songs) => {
    if(err) res.status(500).send('Internal Server Error')
    else{
      res.status(200).json(songs)
    }
  })
})

module.exports = showAllSongs
