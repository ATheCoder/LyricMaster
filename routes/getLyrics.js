const getLyrics = require('express').Router()
const songModel = require('../models/songModel')

getLyrics.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

getLyrics.post('/getLyrics', (req, res) => {
  let {songName, artistName, lyrics} = req.body
  songName = songName || ''
  artistName = artistName || ''
  lyrics = lyrics || ''
  songModel.find({artistName: new RegExp('.*'+artistName +'.*', "i"), title: new RegExp('.*'+songName +'.*', "i"), lyrics: new RegExp('.*'+lyrics+'.*', "i")}, function (err, result) {
    if(err) res.status(500).send('Internal Server Error')
    else{
      res.status(200).json(result)
    }
  })
})

module.exports = getLyrics
