const getArtistURLs = require('./getArtistsBox');
const mongoose = require('mongoose');
const config = require('../../config');
const urlToHTML = require('./urlToHTML');
const getAllPossibleSongsFromURL = require('./singerToSongURL');
const addSong = require('../../controllers/addSong');
const dasteTabar = require('./htmlToSongInfo');

mongoose.connect(config.DatabaseURL, (err => {
  if(err){
    console.log(err);
    throw err
  }
}));

(async () => {
  let mainPageHTML = await urlToHTML('http://taraneyab.com/')
  let artists = await getArtistURLs(mainPageHTML)
  for(let artist of artists){
    let allSongsOfArtist = await getAllPossibleSongsFromURL(artist)
    for(let songURL of allSongsOfArtist){
      let songHTML = await urlToHTML(songURL);
      let song = {};
      song.language = 'Persian'
      song.lyrics = dasteTabar.getLyricsFromSongHTML(songHTML);
      song.title = dasteTabar.getSongNameFromSongHTML(songHTML);
      song.artistName = dasteTabar.getArtistNameFromSongHTML(songHTML);
      addSong(song.title, song.artistName, song.lyrics, song.language).then(() => {console.log('Song Saved!')});
    }
  }
})()
