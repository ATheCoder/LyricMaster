const addSong = require('express').Router()
const addSongController = require('../controllers/addSong')

addSong.post('/addSong', async (req, res) => {
  let {title, artistName, lyrics, language} = req.body
  if(title && artistName && lyrics && language){
    addSongController(title, artistName, lyrics, language).then((song) => {
      res.status(200).send('Success')
    })
  } else{
    res.status(400).send('Invalid arguments; make sure you added the arguments inside the body of the request.')
  }
})

module.exports = addSong
