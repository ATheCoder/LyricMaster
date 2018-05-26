const cheerio = require('cheerio')
const songFullTitle = require('./songFullTitle')
const urlToHTML = require('./urlToHTML')

const getSongNameFromSongHTML = (songHTMLData) => {
  let songName = ''
  const $ = cheerio.load(songHTMLData)
  let strongs = $('strong')
  strongs.each(function (index, element) {
    if(index === 0){
      let unParsedText = cheerio(element).text()
      let FullTitle = songFullTitle(unParsedText)
      songName = FullTitle.replace(getArtistNameFromSongHTML(songHTMLData), '')
    }
  })
  return songName
}

const getArtistNameFromSongHTML = (songHTMLData) => {
  console.log('Getting Artist Name!')
  let artistName = ''
  const $ = cheerio.load(songHTMLData)
  let strongs = $('strong')
    strongs.each(function (index, element) {
    if(index === strongs.length - 1){
      let unParsedText = cheerio(element).text()
      artistName = parseArtistName(unParsedText)
    }
  })
  return artistName
}

const findShit = (songHTMLData) => {
  let shit = ''
  const $ = cheerio.load(songHTMLData)
  let strongs = $('strong')
  strongs.each(function (index, element) {
    if(index === 0){
      shit = cheerio(element).text()
    }
  })
  return shit
}

const getLyricsFromSongHTML = (songHTMLData) => {
  const $ = cheerio.load(songHTMLData)
  let shit = findShit(songHTMLData)
  let content = $('.entry-content').text()
  let lyrics = content.substr(0, content.indexOf('ترانه سرا'))
  return lyrics.replace(shit, '').replace(shit, '');
}

const parseArtistName = (string) => {
  return string.replace('خواننده : ', '')
}

// urlToHTML('http://taraneyab.com/%D9%85%D8%AA%D9%86-%D8%A2%D9%87%D9%86%DA%AF-%D9%85%D8%A7%D9%87-%D8%B9%D8%B3%D9%84-97-%D9%85%D8%B3%DB%8C%D8%AD-%D8%A2%D8%B1%D8%B4-ap-%D9%BE%D8%AE%D8%B4-%D8%A2%D9%86%D9%84%D8%A7%DB%8C%D9%86/').then((res) => {
//   console.log(getArtistNameFromSongHTML(res))
// })

module.exports = {getLyricsFromSongHTML, getArtistNameFromSongHTML, getSongNameFromSongHTML}
