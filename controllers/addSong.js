const SongModel = require('../models/songModel')

module.exports = async (songTitle, artistName, lyrics, language) => {
  if(songTitle && artistName && lyrics && language){
    SongModel.create({title: songTitle, artistName: artistName, lyrics, language}).then((song) => {
        return song
    }).catch(() => {throw new Error('There was an error saving the song')})
  }
}
