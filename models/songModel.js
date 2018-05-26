const mongoose = require('mongoose')

let SongSchema = new mongoose.Schema({
  title: {type: String, required: true},
  artistName: {type: String, required: true},
  full_title: {type: String},
  lyrics: {type: String},
  genre: {type: String},
  language: {type: String, enum: ['Persian', 'English'], required: true}
})

let SongModel = mongoose.models.SongModel || mongoose.model('SongModel', SongSchema)

module.exports = SongModel
